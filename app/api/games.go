package api

import (
  "net/http"
  "log"
  "../database"
  "encoding/json"
  "math/rand"
  "time"
  "../game"
  "../state"
  "../socket"
)

func NewGameHandler(w http.ResponseWriter, r *http.Request, s *socket.SocketServer) {
  if r.Method != "POST"{
    log.Println("unknown method for /games")
    return;
  }
  log.Println("creating game...")
  rand.Seed(time.Now().UTC().UnixNano())
  words := [3]string{"human", "world", "hello"}

  num := rand.Intn(len(words))

  var gameState game.Game

  decoder := json.NewDecoder(r.Body)
  err := decoder.Decode(&gameState)
  checkErr(err)
  log.Println("gameState: ", gameState)
  st := state.NewState(words[num], gameState.UserId1)

  stateJSON, _ := json.Marshal(st)
  gameState.State = *st

  err = database.DBConn.QueryRow(`INSERT INTO games 
    (user_id1, user_id2, game_state, selected_word) 
    VALUES ($1, $2, $3, $4)                                    
    returning id`, gameState.UserId1, gameState.UserId2, stateJSON, words[num]).Scan(&(gameState.Id))

  checkErr(err)
  data, _ := json.Marshal(gameState)

  go func() {
    msg := &socket.Message{"GAME_FETCHED", data}
    s.SendToClient(gameState.Username2, msg) 
  }()
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