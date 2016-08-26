package socket

import (
	"net/http"
	"log"
	"io"
	"golang.org/x/net/websocket"
)

type SocketServer struct {
	path String
	clients []*Client
	messages []*Message
	sendAll chan *Message
	addClient chan *Client
	removeClient chan *Client
}

func newServer(path String) *SocketServer {
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
		client := NewClient(ws, self)
		self.addClient <- client
		client.Listen()
		defer ws.Close()
	}

	http.Handle(self.path, websocket.Handler(onConnect))
	log.Println("Created handler")

	for {
		select {
		case cl := <- this.addClient:
			log.Println("Adding new client")
			self.clients = append(self.clients, cl)
			for _, msg := range self.messages {
				cl.Write() <- msg
			}
			log.Printf("Now.. there are %s clients.", len(self.clients))
		case cl := <- this.removeClient:
			log.Println("Removing Client")
			for i := range self.clients {
				if self.clients[i] == cl {
					self.clients = append(self.clients[:i], self.clients[i+1:]...)
					break
				}						
			
			}
		case msg := <- this.sendAll:
			log.Println("sending all messages: ", msg)
			self.messages = append(self.messages, msg)
 			for _, client := range self.clients {
				client.Write() <- msg
			}
		}
