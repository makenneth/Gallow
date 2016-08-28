package socket

import (
  "log"
  "golang.org/x/net/websocket"
  "encoding/json"
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
      if msg.Type == "NEW_USER" {
        var username string
        err := json.Unmarshal(msg.Data, &username)
        log.Println("New User: ", username)
        
        if err != nil {
          this.done <- true
        }

        this.username = username
        this.server.AddClient() <- this
      } else {
        log.Println("Sending Message, ", msg)
        this.server.SendAll() <- &msg
      }
   
    }    
  }
}

func (this *Client) ListenWrite() {
  for {
    select{
    case msg := <- this.msgCh:
      log.Println("Sending..", msg)
      websocket.JSON.Send(this.ws, msg)
    case <- this.done:
      this.server.RemoveClient() <-this
      this.done <- true
      return
    }
  }
}