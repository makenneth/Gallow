package socket

import (
	"net/http"
	"log"
	"golang.org/x/net/websocket"
)

type SocketServer struct {
	path string
	clients []*Client
	messages []*Message
	sendAll chan *Message
	addClient chan *Client
	removeClient chan *Client
}

func NewServer(path string) *SocketServer {
	clients := make([]*Client, 0)
	messages := make([]*Message, 0)
	addClient := make(chan *Client)
	removeClient := make(chan *Client)
	sendAll := make(chan *Message)

	return &SocketServer{path, clients, messages, sendAll, addClient, removeClient}
}


func (this *SocketServer) AddClient() chan<- *Client {
	return (chan<- *Client)(this.addClient)
}

func (this *SocketServer) RemoveClient() chan<- *Client {
	return (chan<- *Client)(this.removeClient)
}

func (this *SocketServer) SendAll() chan<- *Message {
	return (chan<- *Message)(this.sendAll)
}

func (this *SocketServer) Messages() []*Message {
	messages := make([]*Message, len(this.messages))
	copy(messages, this.messages)
	return messages
}

func (this *SocketServer) Listen() {
	log.Println("Socket Server started...")
	
	onConnect := func(ws *websocket.Conn){
		client := NewClient(ws, this)
		this.addClient <- client
		client.Listen()
		defer ws.Close()
	}

	http.Handle(this.path, websocket.Handler(onConnect))
	log.Println("Created handler")

	for {
		select {
		case cl := <- this.addClient:
			log.Println("Adding new client")
			this.clients = append(this.clients, cl)
			for _, msg := range this.messages {
				cl.Write() <- msg
			}
			log.Printf("Now.. there are %i clients.", len(this.clients))
		case cl := <- this.removeClient:
			log.Println("Removing Client")
			for i := range this.clients {
				if this.clients[i] == cl {
					this.clients = append(this.clients[:i], this.clients[i+1:]...)
					break
				}						
			
			}
		case msg := <- this.sendAll:
			log.Println("sending all messages: ", msg)
			this.messages = append(this.messages, msg)
 			for _, client := range this.clients {
				client.Write() <- msg
			}
		}
	}
}
