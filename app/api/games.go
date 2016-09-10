package api

import (
  "net/http"
  "log"
  "../database"
  "encoding/json"
  "math/rand"
  "time"
  // "strconv"
)
type State struct { 
  Turn int `json:"turn"`
  CorrectGuesses []string `json:"correctGuesses"`
  UsedLetters []string `json:"usedLetters"`
  NumberOfGuesses int `json:"numberOfGuesses"`
  Guess string `json:"guess"`
}
type Game struct {
  Id int `json:"id"`
  UserId1 int `json:"userId1"`
  UserId2 int `json:"userId2"`
  State State `json:"state"`
}


func NewGameHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != "POST"{
    log.Println("unknown method for /games")
    return;
  }
  log.Println("creating game...")
  rand.Seed(time.Now().UTC().UnixNano())
  words := [3]string{"human", "world", "hello"}

  num := rand.Intn(len(words))

  var gameState Game

  decoder := json.NewDecoder(r.Body)
  err := decoder.Decode(&gameState)
  checkErr(err)
  log.Println("gameState: ", gameState)
  state, _ := json.Marshal(gameState.State)
  err = database.DBConn.QueryRow(`INSERT INTO games 
    (user_id1, user_id2, game_state, selected_word) 
    VALUES ($1, $2, $3, $4)                                    
    returning id`, gameState.UserId1, gameState.UserId2, state, words[num]).Scan(&(gameState.Id))

  checkErr(err)
  data, _ := json.Marshal(gameState)
  w.Header().Set("Content-Type", "application/json")
  w.Write(data)
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