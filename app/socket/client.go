package socket

import (
  "log"
  "golang.org/x/net/websocket"
  "encoding/json"
  "../database"
  "../api"
)

type Client struct {
  ws *websocket.Conn
  server *SocketServer
  done chan bool
  msgCh chan *Message
  username string
}

type Game struct {
  Id int `json:"id"`
  UserId1 int `json:"userId1"`
  UserId2 int `json:"userId2"`
  Username1 string `json:"username1"`
  Username2 string `json:"username2"`
  State api.State `json:"state"`
}
type ChatMsg struct {
  author string `json:"author"`
  body string `json:"body"`
}
type NewChatMsg struct {
  game_id int `json:"game_id"`
  user_id int `json:"user_id"`
  author string `json:"author"`
  body string `json:"body"`
  username1 string `json:"username1"`
  username2 string `json:"username2"`
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
        log.Println("gameId, ", gameId )
        if err != nil {
          log.Println("err: ", err)
          // this.done <- true
        }
        log.Println("Game %i connected", gameId)
        gameData, err := RetreiveData(gameId)
        if err != nil {
          log.Println("err2: ", err)
          // this.done <- true
        }
        log.Println("gameData: ", gameData)
        data, err := json.Marshal(gameData)
        if err != nil {
          log.Println("err3: ", err)
        }
        message := &Message{"GAME_CONNECTED", data}
        go this.RetreiveChatMessages(gameId)

        this.msgCh <- message

        var g Game
        err = json.Unmarshal(message.Data, &g)
        if err != nil {
          log.Println("err4: ", err)
        }

        log.Println("unmarshalled data..", g)

        break;
      case "USER_MOVE":
        break;
      case "NEW_MESSAGE":
        var newChatMsg NewChatMsg
        err := json.Unmarshal(msg.Data, &newChatMsg)
        if err != nil {
          this.done <- true
        }

        dest := []string{newChatMsg.username1, newChatMsg.username2}
        newChat := &ChatMsg{newChatMsg.author, newChatMsg.body}
        data, _ := json.Marshal(newChat)
        newMessage := &Message{"NEW_MESSAGE", data}
        broadcastMessage := &InterclientMessage{dest, newMessage}
        go SaveChatMessage(newChat, newChatMsg.username1, newChatMsg.user_id, newChatMsg.game_id)
        this.server.Send() <- broadcastMessage
        break;
      default:
        log.Println("Sending Message, ", msg)
        // this.server.Send() <- &msg
        break;
      }
   
    }    
  }
}

func (this *Client) ListenWrite() {
  for {
    select {
    case msg := <- this.msgCh:
      log.Println("Sending..", msg)
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
  _, _ = database.DBConn.Query(`INSERT INTO messages
    (author, body, user_id, game_id)
    VALUES ($1, $2, $3, $4)`, chatMsg.author, chatMsg.body, user_id, game_id)
}
func (this *Client) RetreiveChatMessages(gameId int) { 
  chatMsgs := make([]ChatMsg, 0)
  var (
    author string
    body string
  )
  rows, err := database.DBConn.Query(`SELECT m.author, m.body FROM games AS g
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
func RetreiveData(gameId int) (*Game, error) {
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

  var gameState api.State
  _ = json.Unmarshal(gameJson, &gameState)
  game := &Game{id, userId1, userId2, username1, username2, gameState}
  return game, err
}