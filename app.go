package main

import (
	"log"
	"net/http"
	"./socket"
)

func main() {
	server := chat.NewServer("/chat")
	go server.Listen()
	
	http.Handle("/", http.FileServer(http.Dir("."))
	log.Fatal(http.ListenAndServer(":8080", nil))
}

