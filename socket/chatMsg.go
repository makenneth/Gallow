package socket
import (
  "../app/database"
  )

type ChatMsg struct {
  Author string `json:"author"`
  Body string `json:"body"`
}

type ChatMsgData struct {
  GameId int `json:"gameId"`
  UserId int `json:"userId"`
  Author string `json:"author"`
  Body string `json:"body"`
  Recipient string `json:"recipient"`
}

func (this *ChatMsgData) SaveChatMessage() string {
  _, err := database.DBConn.Query(`INSERT INTO messages
    (author, body, user_id, game_id)
    VALUES ($1, $2, $3, $4)`, this.Author, this.Body, this.UserId, this.GameId)
  if err != nil {
    return "Error has occured while saving chat messages"
  }
  return ""
}