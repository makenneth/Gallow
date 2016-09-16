package socket

import (
	"net/http"
	"log"
	"golang.org/x/net/websocket"
	// "encoding/json"
)

type Server struct {
	path string
	clients map[string]*Client
	send chan *InterclientMessage
	addClient chan *Client
	removeClient chan *Client
}

func NewServer(path string) *Server {
	clients := make(map[string]*Client, 0)
	addClient := make(chan *Client)
	removeClient := make(chan *Client)
	send := make(chan *InterclientMessage)

	return &Server{path, clients, send, addClient, removeClient}
}


func (this *Server) AddClient() chan<- *Client {
	return (chan<- *Client)(this.addClient)
}

func (this *Server) RemoveClient() chan<- *Client {
	return (chan<- *Client)(this.removeClient)
}

func (this *Server) Send() chan<- *InterclientMessage {
	return (chan<- *InterclientMessage)(this.send)
}

func (this *Server) SendToClient(username string, message *Message) {
	if cl, ok := this.clients[username]; ok {
		cl.Write() <- message
	}
}
func (this *Server) SendToClientConn(username string, message *Message, id int) {
	if cl, ok := this.clients[username]; ok {
		if cl.currentGame == id {
			cl.Write() <- message
		}
	}
}

func (this *Server) Listen() {
	log.Println("Socket Server started...")
	
	onConnect := func(ws *websocket.Conn){
		client := NewClient(ws, this)
		client.Listen()
		defer ws.Close()
	}

	http.HandleFunc(this.path, func(w http.ResponseWriter, r *http.Request){
		s := websocket.Server{Handler: websocket.Handler(onConnect)}
		s.ServeHTTP(w, r)
	})

	for {
		select {
		case cl := <- this.addClient:
			this.clients[cl.username] = cl
			break;
		case cl := <- this.removeClient:
			delete(this.clients, cl.username)
			break;
		case msg := <- this.send:
			for _, username := range msg.Dest {
				if cl, ok := this.clients[username]; ok {
					cl.Write() <- msg.Message
				}
			}
		}
	}
}
