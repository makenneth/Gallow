package api

import (
  "net/http"
  "log"
  "encoding/json"
  "time"
  "io/ioutil"
)

func LogInHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "POST":
    body, err := ioutil.ReadAll(r.Body)
    checkErr(err)
    var u User
    err = json.Unmarshal(body, &u)
    checkErr(err)

    err = u.checkPassword()

    if err != nil {
      w.Header().Set("Content-Type", "application/json; charset=utf-8");
      w.WriteHeader(http.StatusNotFound)
      resText, _ := json.Marshal("Username/password not correct.")
      w.Write(resText)

      return
    }

    sessionToken, err := u.resetSessionToken()
    checkErr(err)
    expiration := time.Now().Add(30 * 24 * time.Hour)
    cookie := http.Cookie{Name: "sessiontokenLit", Value: sessionToken, Expires: expiration}
    http.SetCookie(w, &cookie)
    log.Println("post /session/new");

    break;
  default: 
    log.Println("does not match any routes");
    break;
  }
}



func LogOutHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "DELETE":
    log.Println("delete /session");
    break;
  default: 
    log.Println("does not match any routes");
    break;
  }
}
