package api

import (
  "net/http"
  "log"
  "../database"
  "encoding/json"
  "time"
  "../game"
  "../state"
  "net"
  "../requestError"
)

type RPCMessage struct {
  Type string
  Data json.RawMessage
  Dest string
}

func RPCToSocket(msgType string, data json.RawMessage, dest string) {
  log.Println("sending rpc")

  tcpAddr, err := net.ResolveTCPAddr("tcp4", ":8082")
  if err != nil {
    return
  }
  conn, err := net.DialTCP("tcp", nil, tcpAddr)
  if err != nil {
    return
  }
  rpcMessage := RPCMessage{msgType, data, dest}
  d, _ := json.Marshal(rpcMessage)
  _, err = conn.Write(d)
  if err != nil {
    return
  }
}

func NewGameHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != "POST"{
    log.Println("unknown method for /games")
    return;
  }

  var (
    word string
    user1 User
    gameState game.Game
    updatedAt time.Time
    err error
  )
  done := make(chan bool)

  go func(){
    err = database.DBConn.QueryRow(`
      SELECT word FROM words
      OFFSET floor(random() * 187388)
      LIMIT 1;
      `).Scan(&word)
    if err != nil {
      log.Println("failed to save")
    }
    done <- true
  }()

  go func(){
    user1, err = GetUserFromCookie(w, r)
    if err != nil {
      log.Println("no user")
    }
    done <- true
  }()


  decoder := json.NewDecoder(r.Body)
  err = decoder.Decode(&gameState)
  if err != nil {
    log.Println("data error")
  }
  for i := 0; i < 2; i++ {
    <-done
  }
  gameState.Username1 = user1.Username
  gameState.UserId1 = user1.Id
  gameState.Nickname1 = user1.Nickname

  st := state.NewState(word, gameState.UserId1)

  stateJSON, _ := json.Marshal(st)
  gameState.State = *st

  err = database.DBConn.QueryRow(`INSERT INTO games
    (user_id1, user_id2, game_state, selected_word)
    VALUES ($1, $2, $3, $4)
    returning id, updated_at`, gameState.UserId1, gameState.UserId2, stateJSON, word).Scan(&(gameState.Id), &updatedAt)

  checkErr(err)
  data, _ := json.Marshal(&GameApi{gameState.Id, false, 0, gameState.Nickname1, gameState.Nickname2, updatedAt})
  go RPCToSocket("CREATED_GAME", data, gameState.Username2)

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

func PlayerSuggestionsHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != "GET" {
    log.Println("unknown method for /api/suggestions")
    return;
  }
  suggestions := make([]game.Player, 0)
  var player game.Player
  rows, err := database.DBConn.Query(`
    SELECT id, nickname, username, wins, losses, updated_at
    FROM users ORDER BY random() LIMIT 11;
  `)
  defer rows.Close()
  if err != nil {
    requestError.SendErrorResponse(w, 500, "Internal Error")
    return
  }

  for rows.Next() {
    err = rows.Scan(&player.Id, &player.Nickname, &player.Username, &player.Wins,
      &player.Losses, &player.UpdatedAt)
    if err != nil {
      break
    }
    log.Println(player)
    suggestions = append(suggestions, player)
  }
  data, _ := json.Marshal(suggestions)
  w.Header().Set("Content-Type", "application/json")
  w.Write(data)
}


func checkErr(err error) {
  if err != nil {
    panic(err);
  }
}