package api

import (
  "net/http"
  "log"
  "../database"
  "encoding/json"
  "time"
  "../game"
  "../state"
  "../socket"
)

func NewGameHandler(w http.ResponseWriter, r *http.Request, s *socket.Server) {
  if r.Method != "POST"{
    log.Println("unknown method for /games")
    return;
  }

  var (
    word string
    gameState game.Game
    updatedAt time.Time
  )
  err := database.DBConn.QueryRow(`
    SELECT word FROM words
    OFFSET floor(random() * 187388)
    LIMIT 1;
    `).Scan(&word)
  checkErr(err)
  decoder := json.NewDecoder(r.Body)
  err = decoder.Decode(&gameState)
  checkErr(err)
  st := state.NewState(word, gameState.UserId1)

  stateJSON, _ := json.Marshal(st)
  gameState.State = *st

  err = database.DBConn.QueryRow(`INSERT INTO games 
    (user_id1, user_id2, game_state, selected_word) 
    VALUES ($1, $2, $3, $4)                                    
    returning id, updated_at`, gameState.UserId1, gameState.UserId2, stateJSON, word).Scan(&(gameState.Id), &updatedAt)

  checkErr(err)
  data, _ := json.Marshal(&GameApi{gameState.Id, false, 0, gameState.Nickname1, gameState.Nickname2, updatedAt})

  go func() {
    msg := &socket.Message{"CREATED_GAME", data}
    s.SendToClient(gameState.Username2, msg) 
  }();
  w.Header().Set("Content-Type", "application/json")
  w.Write(data)
}


func MessageRoutesHandler(w http.ResponseWriter, r *http.Request, matches []string) {
  switch r.Method {
    case "GET":
      gameId := matches[1]
      log.Println("get/ /games/:id/messages - id = ", gameId)
    default:
      log.Println("unkown route")
      break;
  }
}

func checkErr(err error) {
  if err != nil {
    panic(err);
  }
}