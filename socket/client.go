package socket

import (
  "log"
  "golang.org/x/net/websocket"
  "encoding/json"
  "../app/database"
  "../app/game"
  "../app/state"
)

type Client struct {
  ws *websocket.Conn
  server *Server
  done chan bool
  msgCh chan *Message
  username string
  nickname string
  currentGame int
}
type Err struct {
  message string
}
const buffSize = 1000

func NewClient(ws *websocket.Conn, server *Server) *Client {
  if ws == nil {
    panic("Websocket can't be nil!!")
  } else if server == nil {
    panic("Server can't be nil!!")
  }

  done := make(chan bool)
  msgCh := make(chan *Message, buffSize)

  return &Client{ws, server, done, msgCh, "", "", 0}
}

func (this *Client) Conn() *websocket.Conn {
  return this.ws
}

func (this *Client) Done() chan<- bool {
  return (chan<- bool)(this.done)
}

func (this *Client) Write() chan<- *Message {
  return (chan<- *Message)(this.msgCh)
}

func (this *Client) Listen() {
  go this.ListenWrite()
  this.ListenRead()
}

func (this *Client) ListenRead() {
  for {
    select {
    case <- this.done:
      this.server.RemoveClient() <- this;
      this.done <- true
      break
    default:
      var msg Message
      err := websocket.JSON.Receive(this.ws, &msg)
      if err != nil {
        this.done <- true
      }
      switch msg.Type {
      case "USER_CONNECTED":
        data := make(map[string]string)
        err := json.Unmarshal(msg.Data, &data)

        if err != nil {
          this.SendErrorMsg("Data is corrupted.")
          return
        }

        this.username = data["username"]
        this.nickname = data["nickname"]
        this.server.AddClient() <- this
        break;
      case "GAME_CONNECTED":
        var gameId int;
        err := json.Unmarshal(msg.Data, &gameId)
        if err != nil {
          return
        }
        this.currentGame = gameId
        go func(){
          chatMsgs, err := this.RetreiveChatMessages(gameId)
          if err != nil  {
            log.Println("err2: ", err)
            // this.done <- true
          }
          data, _ := json.Marshal(chatMsgs)
          message1 := &Message{"FETCHED_MESSAGES", data}
          this.msgCh <- message1

          }()

        go func(){
          gameData, err := this.RetreiveData(gameId)

          if err != nil  {
            this.SendErrorMsg("Data not found...")
            return
          }
          data, _ := json.Marshal(gameData)
          message2 := &Message{"GAME_CONNECTED", data}
          this.msgCh <- message2
        }()

        break;
      case "USER_MOVE":
        var (
          g game.Game
          jsonG []byte
          gameState state.State
          word, opponent, msgType, winner string
          finished bool
          )
        err := json.Unmarshal(msg.Data, &g)
        if err != nil {
          this.SendErrorMsg("An error has occured...")
          return
        }
        err = database.DBConn.QueryRow(`
          SELECT selected_word, game_state, finished
          FROM games
          WHERE id = $1 AND user_id1 = $2 AND user_id2 = $3
          `, g.Id, g.UserId1, g.UserId2).Scan(&word, &jsonG, &finished)
        if err != nil {
          this.SendErrorMsg("An error has occured...")
          return
        }
        if finished {
          return
        }

        err = json.Unmarshal(jsonG, &gameState)
        guess := g.State.Guess
        g.State = gameState
        g.Update(guess, word)

        if opponent = g.Username1; this.username == opponent {
          opponent = g.Username2
        }

        if winner = g.Nickname2; g.Winner == g.UserId1 {
          winner = g.Nickname1
        }

        go this.SendSystemMessage(opponent, this.nickname + " played " + guess, g.Id)

        gJson, _ := json.Marshal(g.State)
        msgType, err = g.UpdateDatabase(gJson)
        if msgType == "GAME_FINISHED" {
          go this.SendSystemMessage(opponent, winner + " won.", g.Id)
        }

        if err != nil {
          this.SendErrorMsg("An error has occured at saving the result...")
          return
        }
        msg := &Message{msgType, gJson}
        this.msgCh <- msg
        this.server.SendToClientConn(opponent, msg, g.Id)
        break
      case "SOLVE_GAME":
        var (
          stateJson []byte
          state state.State
          username1, username2, opponent string
          )
        dataRec := make(map[string]int)

        err := json.Unmarshal(msg.Data, &dataRec)
        if err != nil {
          this.SendErrorMsg("An error has occured...")
          return
        }
        err = database.DBConn.QueryRow(`
          SELECT g.game_state, u1.username, u2.username
          FROM games AS g
          INNER JOIN users AS u1
          ON g.user_id1 = u1.id
          INNER JOIN users AS u2
          ON g.user_id2 = u2.id
          WHERE g.id = $1
          `, dataRec["id"]).Scan(&stateJson, &username1, &username2)
        if err != nil {
          this.SendErrorMsg("An error has occured...")
          return
        }
        _ = json.Unmarshal(stateJson, &state)

        if state.Turn == dataRec["userId"] {
          if opponent = username1; this.username == opponent {
            opponent = username2
          }
          go this.SendSystemMessage(opponent, this.nickname + " is solving...", dataRec["id"])

          state.Solving = true
          updatedState, _ := json.Marshal(state)
          _, err = database.DBConn.Query(`
            UPDATE games
            SET game_state = $1
            WHERE id = $2
            `, updatedState, dataRec["id"])

          if err != nil {
            this.SendErrorMsg("An error has occured...")
            return
          }
          msg := &Message{"MOVE_MADE", updatedState}
          this.msgCh <- msg
          this.server.SendToClientConn(opponent, msg, dataRec["id"])
        }

        break
      case "NEW_MESSAGE":
        var chatMsgData ChatMsgData
        err := json.Unmarshal(msg.Data, &chatMsgData)
        if err != nil {
          this.done <- true
        }

        newChat := &ChatMsg{chatMsgData.Author, chatMsgData.Body}
        data, _ := json.Marshal(newChat)

        msg := &Message{"NEW_MESSAGE", data}
        go func() {
          e := chatMsgData.SaveChatMessage()
          if e != "" {
            this.SendErrorMsg(e)
          }
        }();
        this.msgCh <- msg
        this.server.SendToClientConn(chatMsgData.Recipient, msg, chatMsgData.GameId)
        break;
      default:
        this.server.RemoveClient() <- this
        this.done <- true
        break;
      }

    }
  }
}

func (this *Client) ListenWrite() {
  for {
    select {
    case msg := <- this.msgCh:
      websocket.JSON.Send(this.ws, msg)
      break;
    case <- this.done:
      this.server.RemoveClient() <-this
      this.done <- true
      return
    }
  }
}

func SaveChatMessage(chatMsg *ChatMsg, username string, user_id, game_id int) error {
  _, err := database.DBConn.Query(`INSERT INTO messages
    (author, body, user_id, game_id)
    VALUES ($1, $2, $3, $4)`, chatMsg.Author, chatMsg.Body, user_id, game_id)

  return err
}
func (this *Client) RetreiveChatMessages(gameId int) ([]ChatMsg, error) {
  chatMsgs := make([]ChatMsg, 0)
  var author, body string
  rows, err := database.DBConn.Query(`SELECT m.author, m.body
    FROM games AS g
    INNER JOIN messages AS m
    ON g.id = m.game_id
    WHERE g.id = $1
    ORDER BY created_at ASC
    LIMIT 20`, gameId)

  for rows.Next() {
    _ = rows.Scan(&author, &body)
    chatMsgs = append(chatMsgs, ChatMsg{author, body})
  }
  return chatMsgs, err

}
func (this *Client) SendSystemMessage(opponent, sysMsg string, gameId int) {
  newChatMsg := &ChatMsg{"System", sysMsg}
  cJson, _ := json.Marshal(newChatMsg)
  msg := &Message{"NEW_MESSAGE", cJson}
  this.msgCh <- msg
  this.server.SendToClientConn(opponent, msg, gameId)
  err := SaveChatMessage(newChatMsg, "System", 1, gameId)
  if err != nil {
    this.SendErrorMsg("An error occured while saving the message...")
    return
  }
}

func (this *Client) SendErrorMsg(err string) {
  errMsg := &Err{err}

  data, _ := json.Marshal(errMsg)
  msg := &Message{"ERROR_OCCURED", data}
  this.msgCh <- msg
}
func (this *Client) RetreiveData(gameId int) (*game.Game, error) {

  var (
    username1, username2, nickname1, nickname2 string
    userId1, userId2, id, winner int
    finished bool
    gameJson []byte
   )
  err := database.DBConn.QueryRow(`SELECT
    g.id, g.user_id1, g.user_id2,
    u1.username, u2.username,
    u1.nickname, u2.nickname,
    g.finished, g.winner, g.game_state
    FROM games AS g
    INNER JOIN users AS u1
    ON u1.id = g.user_id1
    INNER JOIN users AS u2
    ON u2.id = g.user_id2
    WHERE g.id = $1
    LIMIT 1`, gameId).Scan(&id, &userId1, &userId2, &username1, &username2,
      &nickname1, &nickname2, &finished, &winner, &gameJson)

  var gameState state.State
  _ = json.Unmarshal(gameJson, &gameState)
  game := &game.Game{id, userId2, username2, nickname2, userId1,
    username1, nickname1, finished, winner, gameState}
  return game, err
}
