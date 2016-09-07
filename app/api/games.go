package api

import (
  "net/http"
  "log"
  "../database"
  "encoding/json"
  "math/rand"
  "time"
)

type Game struct {
  User_id1 int `json:"user_id1"`
  User_id2 int `json:"user_id2"`
  State json.RawMessage `json:"state"`
}


func NewGameHandler(w http.ResponseWriter, r *http.Request) {

  //ok so the procedure here..is once a new game is created
  //and user has been redirected -> connect to the socket 
  //every change will be saved in soocket..and will be broadcasted to the other dude
  //if they're in the client lists.
  //(so this probably involves a sql query when establishing a connection)
  //to see who the other player is...
  if r.Method != "GET"{
    log.Println("unknown method for /game")
    return;
  }
  rand.Seed(time.Now().UTC().UnixNano())
  words := [3]string{"human", "world", "hello"}
  num := rand.Intn(len(words))
  var newGameId int
  decoder := json.NewDecoder(r.Body)
  var gameState Game
  err := decoder.Decode(&gameState) 

  gameState.State = []byte("{'selectedWord':'" + words[num] + "'}")
  checkErr(err)
  err = database.DBConn.QueryRow(`INSERT INTO games 
    (user_id1, user_id2, game_state) 
    VALUES ($1, $2, $3) 
    returning id`, gameState.User_id1, gameState.User_id2, gameState.State).Scan(&newGameId)

  data, _ := json.Marshal([]byte("{'game_id':'" + string(newGameId) + "'}"))
  w.Header().Set("Content-Type", "application/json; charset=utf-8");
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