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

func GamesRouteHandler(w http.ResponseWriter, r *http.Request, matches []string) {
  if r.Method == "GET" {
    playerId := matches[1]
    finished := make([]game, 0)
    unfinished := make([]game, 0)
    rows, err := database.DBConn.Query(`
      SELECT g.*, u1.username, u1.nickname, u2.username, u2.nickname
      FROM games AS g
      INNER JOIN users AS u1
      ON user_id1 = u1.id
      INNER JOIN users AS u2
      ON user_id2 = u2.id
      WHERE user_id1 = $1 OR user_id2 = $1 
    `, playerId)
    
    for rows.Next() {
      
    }
  }
  log.Println("unmatch routes")
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