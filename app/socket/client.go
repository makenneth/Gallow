package socket

import (
  "log"
  "golang.org/x/net/websocket"
  "encoding/json"
  "../database"
  "../game"
  "../state"
  // "errors"
)

type Client struct {
  ws *websocket.Conn
  server *SocketServer
  done chan bool
  msgCh chan *Message
  username string
}

const buffSize = 1000

func NewClient(ws *websocket.Conn, server *SocketServer) *Client { 
  if ws == nil {
    panic("Websocket can't be nil!!")
  } else if server == nil {
    panic("Server can't be nil!!")
  }

  done := make(chan bool)
  msgCh := make(chan *Message, buffSize)

  return &Client{ws, server, done, msgCh, ""}
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
      log.Println("message-received, type: ", msg.Type)
      switch msg.Type {
      case "USER_CONNECTED": 
        var username string
        err := json.Unmarshal(msg.Data, &username)
        log.Println("New User: ", username)
        
        if err != nil {
          this.done <- true
        }

        this.username = username
        this.server.AddClient() <- this
        break;
      case "GAME_CONNECTED": 
        var gameId int;
        err := json.Unmarshal(msg.Data, &gameId)
        if err != nil {
          log.Println("err1: ", err)
          this.done <- true
        }
        go func(){
          chatMsgs, err := this.RetreiveChatMessages(gameId)
          if err != nil  {
            log.Println("err2: ", err)
            this.done <- true
          }
          data, _ := json.Marshal(chatMsgs)
          message1 := &Message{"FETCHED_MESSAGES", data}
          this.msgCh <- message1
          
          }()
          
        go func(){
          gameData, err := this.RetreiveData(gameId)
      
          if err != nil  {
            log.Println("err2: ", err)
            this.done <- true
          }
          data, err := json.Marshal(gameData)
          if err != nil {
            log.Println("err3: ", err)
            this.done <- true
          }
          message2 := &Message{"GAME_CONNECTED", data}
          this.msgCh <- message2
        }()

        break;
      case "USER_MOVE":
        var (
          g game.Game
          jsonG []byte
          gameState state.State
          word, opponent, nickname, msgType, winner string
          finished bool
          )
        err := json.Unmarshal(msg.Data, &g)
        if err != nil {
          log.Println("err1: ", err)
        }
        log.Println("game data received: ", g)

        err = database.DBConn.QueryRow(`
          SELECT selected_word, game_state, finished
          FROM games
          WHERE id = $1 AND user_id1 = $2 AND user_id2 = $3
          `, g.Id, g.UserId1, g.UserId2).Scan(&word, &jsonG, &finished)
        if err != nil {
          log.Println("err2: ", err)
        }
        if finished {
          return
        }

        err = json.Unmarshal(jsonG, &gameState)
        guess := g.State.Guess
        g.State = gameState
        g.Update(guess, word)
        log.Println("game data updated: ", g)

        nickname = g.Nickname2
        if opponent = g.Username1; this.username == opponent {
          opponent = g.Username2
          nickname = g.Nickname1
        }

        if winner = g.Nickname2; g.Winner == 1 {
          winner = g.Nickname1
        }
        go func(){
          newChatMsg := &ChatMsg{"System", nickname + " played " + guess}
          cJson, _ := json.Marshal(newChatMsg)
          msg := &Message{"NEW_MESSAGE", cJson}
          this.msgCh <- msg
          this.server.SendToClient(opponent, msg)
          SaveChatMessage(newChatMsg, "System", 1, g.Id)
        }()

        gJson, _ := json.Marshal(g.State)
        msgType, err = g.UpdateDatabase(gJson)
        if msgType == "GAME_FINISHED" {
          go func() {
            newChatMsg := &ChatMsg{"System", winner + " won."}
            cJson, _ := json.Marshal(newChatMsg)
            msg := &Message{"NEW_MESSAGE", cJson}
            this.msgCh <- msg
            this.server.SendToClient(opponent, msg)
            SaveChatMessage(newChatMsg, "System", 1, g.Id)
          }()
        }
        if err != nil {
          log.Println("error in updating database");
        }
        msg := &Message{msgType, gJson}
        this.msgCh <- msg
        this.server.SendToClient(opponent, msg)
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
        go chatMsgData.SaveChatMessage()
        this.msgCh <- msg
        this.server.SendToClient(chatMsgData.Recipient, msg)
        break;
      default:
        log.Println("Message Type unrecognized, ", msg)
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

func SaveChatMessage(chatMsg *ChatMsg, username string, user_id, game_id int){
  _, err := database.DBConn.Query(`INSERT INTO messages
    (author, body, user_id, game_id)
    VALUES ($1, $2, $3, $4)`, chatMsg.Author, chatMsg.Body, user_id, game_id)
  //maybe can check err then send back messages letting the user know 
  //there was issue saving
  log.Println("save chat message err: ", err)
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
  game := &game.Game{id, userId1, userId2, username1, username2, 
    nickname1, nickname2, finished, winner, gameState}
  return game, err
}