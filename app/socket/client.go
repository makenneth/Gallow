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
      return
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
        message := &Message{"GAME_CONNECTED", data}
        go this.RetreiveChatMessages(gameId)

        this.msgCh <- message
        break;
      case "USER_MOVE":
        var (
          g game.Game
          jsonG []byte
          gameState state.State
          word string
          opponent string
          )
        done := make(chan bool)
        err := json.Unmarshal(msg.Data, &g)
        if err != nil {
          log.Println("err1: ", err)
        }
        log.Println("game data received: ", g)
        

        err = database.DBConn.QueryRow(`
          SELECT selected_word, game_state
          FROM games
          WHERE id = $1 AND user_id1 = $2 AND user_id2 = $3
          `, g.Id, g.UserId1, g.UserId2).Scan(&word, &jsonG)
        if err != nil {
          log.Println("err2: ", err)
        }
        err = json.Unmarshal(jsonG, &gameState)
        log.Println("game state: ", gameState)
        guess := g.State.Guess
        g.State = gameState

        go func(){
          g.UpdateUsedLetters(guess)
          done <- true
        }()
        go func(){
          g.UpdateCorrectGuesses(guess, word)
          done <- true
        }()
        //somehow check the state to see if the game has ended
        for i := 0; i < 2; i++ {
          log.Println("%i tasks done", i)
          <- done
        }

        log.Println("game data updated: ", g)
        gJson, _ := json.Marshal(g.State)

        _, err = database.DBConn.Query(`
          UPDATE games
          SET game_state = $1
          WHERE id = $2 AND user_id1 = $3 AND user_id2 = $4
        `, gJson, g.Id, g.UserId1, g.UserId2)
        if err != nil {
          panic(err)
        }

        if opponent = g.Username1; this.username == opponent {
          opponent = g.Username2
        }
        msg := &Message{"MOVE_MADE", gJson}
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
func (this *Client) RetreiveChatMessages(gameId int) { 
  chatMsgs := make([]ChatMsg, 0)
  var (
    author string
    body string
  )
  rows, err := database.DBConn.Query(`SELECT m.author, m.body
    FROM games AS g
    INNER JOIN messages AS m
    ON g.id = m.game_id
    WHERE g.id = $1
    ORDER BY created_at DESC
    LIMIT 20`, gameId)

  if err != nil {
    log.Println(err)
    this.done <- true
  }
  for rows.Next() {
    _ = rows.Scan(&author, &body)
    chatMsgs = append(chatMsgs, ChatMsg{author, body})
  }
  data, _ := json.Marshal(chatMsgs)
  message := &Message{"FETCHED_MESSAGES", data}
  this.msgCh <- message
}
func (this *Client)RetreiveData(gameId int) (*game.Game, error) {

  var (
    username1 string
    username2 string
    userId1 int
    userId2 int
    id int
    gameJson []byte
   )
  err := database.DBConn.QueryRow(`SELECT u1.username, u2.username, g.user_id1, g.user_id2,  
    g.id, g.game_state
    FROM games AS g
    INNER JOIN users AS u1
    ON u1.id = g.user_id1
    INNER JOIN users AS u2
    ON u2.id = g.user_id2
    WHERE g.id = $1
    LIMIT 1`, gameId).Scan(&username1, &username2, &userId1, &userId2, &id, &gameJson)

  // if this.username != username1 && this.username != username2 {
  //   err = errors.New("Invalid user access!!")

  //   return nil, err
  // }
  var gameState state.State
  _ = json.Unmarshal(gameJson, &gameState)
  game := &game.Game{id, userId1, userId2, username1, username2, gameState}
  return game, err
}