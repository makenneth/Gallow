package api

import (
  "net/http"
  "encoding/json"
  "time"
  "../database"
  "../game"
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
}
func GamesRouteHandler(w http.ResponseWriter, r *http.Request, matches []string) {
  if r.Method == "GET" {
    var (
      id int
      finished bool
      )
    playerId := matches[1]
    data := &UserGamesData{make([]GameApi, 0), make([]GameApi, 0)}
    rows, err := database.DBConn.Query(`
      SELECT g.id, g.finished
      FROM games AS g
      WHERE user_id1 = $1 OR user_id2 = $1 
    `, playerId)
    //maybe if finished..fetch from api routes?
    for rows.Next() {
      rows.Scan(&id, &finished)
      if finished {
        data.finished = append(data.finished, &{id, finished})
      } else {
        data.unfinished = append(data.unfinished, &{id, finished})
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