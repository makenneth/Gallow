package socket 

import (
  "../database"
  "log"
  )
type ChatMsgData struct {
  GameId int `json:"gameId"`
  UserId int `json:"userId"`
  Author string `json:"author"`
  Body string `json:"body"`
  Recipient string `json:"recipient"`
}

func (this *ChatMsgData) SaveChatMessage(){
  _, err := database.DBConn.Query(`INSERT INTO messages
    (author, body, user_id, game_id)
    VALUES ($1, $2, $3, $4)`, this.Author, this.Body, this.UserId, this.GameId)
  //should check err then let the user know that an error has occured
  log.Println("save chat message err: ", err)
}