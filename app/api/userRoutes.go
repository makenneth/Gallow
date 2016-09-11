package api

import (
  "net/http"
  "encoding/json"
  "time"
)
type Error struct {
  Message string
}

func GamesRouteHandler(w http.ResponseWriter, r *http.Request) {

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
  cu := User{newPlayerId, u.Username}
  SetCurrentUser(token, cu)
  data, _ := json.Marshal(&cu)
  w.Write(data)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {

}