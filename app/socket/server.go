package socket

import (
	"net/http"
	"log"
	"golang.org/x/net/websocket"
	"encoding/json"
)

type SocketServer struct {
	path string
	clients map[string]*Client
	messages []*Message
	sendAll chan *Message
	addClient chan *Client
	removeClient chan *Client
}

func NewServer(path string) *SocketServer {
	clients := make(map[string]*Client, 0)
	messages := make([]*Message, 0)
	addClient := make(chan *Client)
	removeClient := make(chan *Client)
	sendAll := make(chan *Message)

	return &SocketServer{path, clients, messages, sendAll, addClient, removeClient}
}

func (this *SocketServer) AllClients() []string {
	clients := make([]string, len(this.clients))
	i := 0
	for key, cl := range this.clients {
		clients[i] = cl.username
		i++
	}
	return clients
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
		allClients, err := json.Marshal(this.AllClients())

		log.Println("Marshalled clients", allClients)
		if err != nil {
			log.Fatal(err)
		}
		client.Write() <- &Message{"CURRENT_USERS", allClients}
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

			removeClient, err := json.Marshal(cl.username)
			if err != nil {
				log.Fatal(err)
			}
			for i := range this.clients {
				if this.clients[i] == cl {
					this.clients = append(this.clients[:i], this.clients[i+1:]...)
					break
				}						
				
				for _, client := range this.clients {
					client.Write()<- &Message{"REMOVE_USER", removeClient}
				}
			}
		case msg := <- this.sendAll:
			log.Println("sending all messages: ", msg)
			if msg.Type == "NEW_MESSAGE" {
				this.messages = append(this.messages, msg)
			}
 			for _, client := range this.clients {
				client.Write() <- msg
			}
		}
	}
}
