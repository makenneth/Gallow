package main

import (
	"log"
	"net/http"
	"./app/socket"
)

func main() {
	server := socket.NewServer("/chat")
	go server.Listen()
	
  http.HandleFunc("/public/", func(w http.ResponseWriter, r *http.Request){
    http.ServeFile(w, r, r.URL.Path[1:])
  })
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
    http.ServeFile(w, r, "index.html");
  })
	log.Fatal(http.ListenAndServe(":8080", nil))
}

