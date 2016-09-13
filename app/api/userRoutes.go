package api

import (
  "net/http"
  "encoding/json"
  "time"
  "../database"
  "log"
)
type Error struct {
  Message string
}
type UserGamesData struct {
  Finished []GameApi `json:"finished"`
  Unfinished []GameApi `json:"unfinished"`
}

type GameApi struct {
  Id int `json:"id"`
  Finished bool `json:"finished"`
  Winner int `json:"winner"`
  Nickname1 string `json:"nickname1"`
  Nickname2 string `json:"nickname2"`
}
func GamesRouteHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method == "GET" {
    cookie, err := r.Cookie("sessiontokenLit")
    if err != nil || cookie.String() == ""{
      log.Println("Can't fetch; no such user");
      return
    }
    playerId := Sessions[cookie.Value].Id
    var (
      id int
      finished bool
      nickname1 string
      nickname2 string
      winner int
      )
    log.Println("fetched games for user...", playerId)
    data := &UserGamesData{make([]GameApi, 0), make([]GameApi, 0)}
    rows, err := database.DBConn.Query(`
      SELECT g.id, g.finished, g.winner, u1.nickname, u2.nickname
      FROM games AS g
      INNER JOIN users AS u1
      ON u1.id = g.user_id1
      INNER JOIN users AS u2
      ON u2.id = g.user_id2
      WHERE g.user_id1 = $1 OR g.user_id2 = $1 
    `, playerId)
    if err != nil {
      log.Println(err)
    }
    //maybe if finished..fetch from api routes?
    for rows.Next() {
      rows.Scan(&id, &finished, &winner, &nickname1, &nickname2)
      if finished {
        data.Finished = append(data.Finished, GameApi{id, finished, winner, nickname1, nickname2})
      } else {
        data.Unfinished = append(data.Unfinished, GameApi{id, finished, winner, nickname1, nickname2})
      }
    }

    w.Header().Set("Content-Type", "application/json");
    json.NewEncoder(w).Encode(data)

  } else {
    log.Println("unmatch routes")
  }
}


func CurrentUserHandler(w http.ResponseWriter, r *http.Request) {
  cookie, _ := r.Cookie("sessiontokenLit")

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
  var u UserData
  decoder := json.NewDecoder(r.Body)
  err := decoder.Decode(&u)
  checkErr(err)

  token, newPlayerId, err := u.InsertUser()

  expiration := time.Now().Add(30 * 24 * time.Hour)
  cookie := &http.Cookie{Name: "sessiontokenLit", Value: token, Expires: expiration, Path: "/"}
  http.SetCookie(w, cookie)
  w.Header().Set("Content-Type", "application/json")
  cu := User{newPlayerId, u.Username, u.Nickname}
  SetCurrentUser(token, cu)
  data, _ := json.Marshal(&cu)
  w.Write(data)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {

}