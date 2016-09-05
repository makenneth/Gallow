package api

import (
  "net/http"
  "log"
  "encoding/json"
  "time"
  "io/ioutil"
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
    user := GetCurrentUser(cookie.Value)  
    log.Println("token: ", cookie.Value)
    data, _ := json.Marshal(user)
    log.Println(user)
    w.Write(data)
  }

}
func SignUpHandler(w http.ResponseWriter, r *http.Request) {
  body, _ := ioutil.ReadAll(r.Body)
  var u User
  err := json.Unmarshal(body, &u)
  checkErr(err)

  token, newPlayerId, err := u.InsertUser()
  log.Println("newPlayerId: ", newPlayerId)

  expiration := time.Now().Add(30 * 24 * time.Hour)
  cookie := &http.Cookie{Name: "sessiontokenLit", Value: token, Expires: expiration, Path: "/"}
  log.Println("setting cookie: ", cookie)
  http.SetCookie(w, cookie)
  w.Header().Set("Content-Type", "application/json")
  cu := CurrentUser{newPlayerId, u.Username}
  SetCurrentUser(cu)
  data, _ := json.Marshal(&cu)
  w.Write(data)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {

}
