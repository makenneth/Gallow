package socket

import (
	"net/http"
	"log"
	"golang.org/x/net/websocket"
	// "encoding/json"
)

type SocketServer struct {
	path string
	clients map[string]*Client
	// messages []*Message
	send chan *InterclientMessage
	addClient chan *Client
	removeClient chan *Client
}

func NewServer(path string) *SocketServer {
	clients := make(map[string]*Client, 0)
	// messages := make([]*Message, 0)
	addClient := make(chan *Client)
	removeClient := make(chan *Client)
	send := make(chan *InterclientMessage)

	return &SocketServer{path, clients, send, addClient, removeClient}
}


func (this *SocketServer) AddClient() chan<- *Client {
	return (chan<- *Client)(this.addClient)
}

func (this *SocketServer) RemoveClient() chan<- *Client {
	return (chan<- *Client)(this.removeClient)
}

func (this *SocketServer) Send() chan<- *InterclientMessage {
	return (chan<- *InterclientMessage)(this.send)
}

func (this *SocketServer) Listen() {
	log.Println("Socket Server started...")
	
	onConnect := func(ws *websocket.Conn){
		client := NewClient(ws, this)
		client.Listen()
		defer ws.Close()
	}

	http.Handle(this.path, websocket.Handler(onConnect))
	log.Println("Created handler")

	for {
		select {
		case cl := <- this.addClient:
			log.Printf("Adding new client %s", cl.username)
			this.clients[cl.username] = cl
			break;
		case cl := <- this.removeClient:
			log.Printf("Removing Client %s", cl.username)
			delete(this.clients, cl.username)
			break;
		case msg := <- this.send:
			for _, username := range msg.Dest {
				if cl, ok := this.clients[username]; ok {
					log.Println("sending message to %s", cl.username)
					cl.Write() <- msg.Message
				}
			}
		}
	}
}
