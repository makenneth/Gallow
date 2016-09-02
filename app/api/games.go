package api

import (
  "net/http"
  "log"
  "../database"
  "encoding/json"
)

type Game struct {
  id int
  user_id1 int
  user_id2 int
  state json.RawMessage //not sure if this is the best datatype
}


func NewGameHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != "GET"{
    log.Println("unknown method for /game")
    return;
  }
  var newGameId int
  decoder := json.NewDecoder(r.Body)
  var gameState Game
  err := decoder.Decode(&gameState) 
  checkErr(err)
  err = database.DBConn.QueryRow(`INSERT INTO games 
    (user_id1, user_id2, game_state) 
    VALUES ($1, $2, $3) 
    returning id`, gameState.user_id1, gameState.user_id2, gameState.state).Scan(&newGameId)


}

func GameRoutesHandler(w http.ResponseWriter, r *http.Request, matches []string) {
  gameId := matches[1]

  switch r.Method {
  case "GET":
      rows, _ := database.DBConn.Query("SELECT * FROM games WHERE id = $1", gameId)
      log.Println(rows)
  case "PATCH":
      log.Println("get/post/patch: /games/:id - ", gameId)
      break;
  default:
      log.Println("unknown route");
      break;
  }
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