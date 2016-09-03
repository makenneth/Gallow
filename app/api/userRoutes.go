package api

import (
  "net/http"
  "log"
  "encoding/json"
  "time"
  "io/ioutil"
)

func GamesRouteHandler(w http.ResponseWriter, r *http.Request) {

}



func SignUpHandler(w http.ResponseWriter, r *http.Request) {
  body, _ := ioutil.ReadAll(r.Body)
  var u User
  err := json.Unmarshal(body, &u)
  checkErr(err)

  token, newPlayerId, err := u.InsertUser()
  log.Println("newPlayerId: ", newPlayerId)

  expiration := time.Now().Add(30 * 24 * time.Hour)
  cookie := http.Cookie{Name: "sessiontokenLit", Value: token, Expires: expiration}
  http.SetCookie(w, &cookie)
  w.Header().Set("Content-Type", "application/json")
  data, _ := json.Marshal(&UserData{newPlayerId, u.Username})
  w.Write(data)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {

}
