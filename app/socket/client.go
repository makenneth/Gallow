package socket

import (
  "log"
  "golang.org/x/net/websocket"
  "encoding/json"
  "../database"
  "../api"
  "../game"
)

type Client struct {
  ws *websocket.Conn
  server *SocketServer
  done chan bool
  msgCh chan *Message
  username string
}


type ChatMsg struct {
  Author string `json:"author"`
  Body string `json:"body"`
}
type NewChatMsg struct {
  GameId int `json:"gameId"`
  UserId int `json:"userId"`
  Author string `json:"author"`
  Body string `json:"body"`
  Recipient string `json:"recipient"`
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
        //We need to check whether one of the user is part of the game
        if err != nil {
          this.done <- true
        }
        log.Println("Game %i connected", gameId)
        gameData, err := RetreiveData(gameId)
      
        if err != nil  {
          this.done <- true
        }
        data, err := json.Marshal(gameData)
        if err != nil {
          this.done <- true
        }
        message := &Message{"GAME_CONNECTED", data}
        go this.RetreiveChatMessages(gameId)

        this.msgCh <- message
        break;
      case "USER_MOVE":
        var g game.Game;
        done := make(chan bool)
        err := json.Unmarshal(msg.Data, &g)
        if err != nil {
          log.Println("err1: ", err)
        }
        go func(){
          g.UpdateUsedLetters()
          done <- true
        }
        go func(){
          g.UpdateCorrectGuesses()
          done <- true
        }
        go func(){
          g.UpdateStats()
          done <- true
        }

        for i := 0; i < 3; i++ {
          <- done
        }

        gJson, err := JSON.marshal(g.State)
        err := database.DBConn.Query(`
          UPDATE games
          SET game_state = $1
          WHERE id = $2, user_id1 = $3, user_id2 = $4
        `, gJson, g.Id, g.UserId1, g.userId2)
        if err != nil {
          panic(err)
        }

        dest := []string{g.Username1, g.Username2}
        newMessage := &Message{"USER_MOVE", gJson}
        broadcastMessage := &InterclientMessage{dest, newMessage}
        this.server.Send() <- broadcastMessage
        break;
      case "NEW_MESSAGE":
        var newChatMsg NewChatMsg
        err := json.Unmarshal(msg.Data, &newChatMsg)
        if err != nil {
          this.done <- true
        }

        dest := []string{newChatMsg.Author, newChatMsg.Recipient}
        newChat := &ChatMsg{newChatMsg.Author, newChatMsg.Body}
        data, _ := json.Marshal(newChat)
        newMessage := &Message{"NEW_MESSAGE", data}
        broadcastMessage := &InterclientMessage{dest, newMessage}
        go SaveChatMessage(newChat, newChatMsg.Author, newChatMsg.UserId, newChatMsg.GameId)
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
func RetreiveData(gameId int) (*Game.Game, error) {
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
  game := &Game.Game{id, userId1, userId2, username1, username2, gameState}
  return game, err
}