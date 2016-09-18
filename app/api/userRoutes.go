package api

import (
  "net/http"
  "encoding/json"
  "time"
  "../database"
  "log"
  "../csrf"
  "fmt"
)
type Error struct {
  Message string
}
type UserGamesData struct {
  Finished []GameApi `json:"finished"`
  Unfinished []GameApi `json:"unfinished"`
  Fetched bool `json:"fetched"`
}

type GameApi struct {
  Id int `json:"id"`
  Finished bool `json:"finished"`
  Winner int `json:"winner"`
  Nickname1 string `json:"nickname1"`
  Nickname2 string `json:"nickname2"`
  UpdatedAt time.Time `json:"updatedAt"`
}
func GamesRouteHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method == "GET" {
    cookie, err := r.Cookie("session-token")
    if err != nil || cookie.String() == ""{
      log.Println("Can't fetch; no such user");
      return
    }
    playerId := Sessions[cookie.Value].Id
    var (
      id, winner int
      finished bool
      nickname1, nickname2 string
      updatedAt time.Time
      )
    data := &UserGamesData{make([]GameApi, 0), make([]GameApi, 0), true}
    rows, err := database.DBConn.Query(`
      SELECT g.id, g.finished, g.winner, g.updated_at, u1.nickname, u2.nickname
      FROM games AS g
      INNER JOIN users AS u1
      ON u1.id = g.user_id1
      INNER JOIN users AS u2
      ON u2.id = g.user_id2
      WHERE g.user_id1 = $1 OR g.user_id2 = $1 
      ORDER BY g.updated_at
      LIMIT 10
    `, playerId)
    if err != nil {
      log.Println(err)
    }
    //maybe if finished..fetch from api routes?
    for rows.Next() {
      rows.Scan(&id, &finished, &winner, &updatedAt, &nickname1, &nickname2)
      if finished {
        data.Finished = append(data.Finished, GameApi{id, finished, winner, nickname1, nickname2, updatedAt})
      } else {
        data.Unfinished = append(data.Unfinished, GameApi{id, finished, winner, nickname1, nickname2, updatedAt})
      }
    }

    w.Header().Set("Content-Type", "application/json");
    json.NewEncoder(w).Encode(data)
  } else {
    log.Println("unmatch routes")
  }
}


func CurrentUserHandler(w http.ResponseWriter, r *http.Request) {
  cookie, _ := r.Cookie("session-token")

  if cookie.String() == "" {
    data, _ := json.Marshal(&Error{"No such User"})
    w.WriteHeader(http.StatusNotFound)
    w.Write(data)
  } else {
    user := GetCurrentUser(w, cookie.Value)  
    data, _ := json.Marshal(user)
    w.Write(data)
  }

}
func SignUpHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != "POST" {
    return
  }
  validRequest := csrf.CheckCSRF(r)
  if !validRequest {
    w.WriteHeader(http.StatusForbidden)
    fmt.Fprintf(w, "<html><head></head><body><h1>403 - Forbidden Access</h1><p>Access to this resource is denied!</p></body></html>")
    return
  }
  var u UserData
  decoder := json.NewDecoder(r.Body)
  err := decoder.Decode(&u)
  checkErr(err)
  b, str := VerifyUser(u)
  if !b {
    w.Header().Set("Content-Type", "application/json; charset=utf-8");
    w.WriteHeader(http.StatusUnprocessableEntity)
    resText, _ := json.Marshal(str)
    w.Write(resText)
    return
  }
  token, newPlayerId, err := u.InsertUser()

  expiration := time.Now().Add(30 * 24 * time.Hour)
  cookie := &http.Cookie{Name: "session-token", Value: token, Expires: expiration, Path: "/"}
  http.SetCookie(w, cookie)
  w.Header().Set("Content-Type", "application/json")
  cu := User{newPlayerId, u.Username, u.Nickname}
  SetCurrentUser(token, cu)
  data, _ := json.Marshal(&cu)
  w.Write(data)
}
func VerifyUser(u UserData) (bool, string) {
  b, e := true, ""
  if len(u.Nickname) < 8 {
    b, e = false, "Nickname"
  }
  if len(u.Username) < 8 {
    b, e = false, "Username"
  }
  if len(u.Password) < 8 {
    b, e = false, "Password"
  }

  str := e + " must be at least 8 chars long."
  return b, str
}
func UserHandler(w http.ResponseWriter, r *http.Request) {

}