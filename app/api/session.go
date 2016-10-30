package api

import (
  "net/http"
  "log"
  // "fmt"
  "encoding/json"
  "time"
  "../token"
  "../csrf"
  "../database"
)
type ResultError struct {
  code int
  message string
}
func LogInHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "POST":
    var (
      u UserData
      data []byte
      )
    error := make(chan *ResultError)
    done := make(chan bool)
    go func(){
      validRequest := csrf.CheckCSRF(r)
      if !validRequest {
        error <- &ResultError{403, "Forbidden Access"}
      } else {
        error <- &ResultError{0, ""}
      }
    }()
    go func() {
      decoder := json.NewDecoder(r.Body)
      err1 := decoder.Decode(&u)
      err2 := u.CheckPassword()
      if err1 != nil || err2 != nil {
        error <- &ResultError{404, "Invalid username or password"}
      } else {
        error <- &ResultError{0, ""}
      }
    }()

    for i := 0; i < 2; i++ {
      e := <- error
      if e.code != 0 {
        w.Header().Set("Content-Type", "application/json; charset=utf-8");
        w.WriteHeader(e.code)
        resText, _ := json.Marshal(e.message)
        w.Write(resText)

        return
      }
    }
    id, sessionToken, err := u.ResetSessionToken()
    checkErr(err)
    go func() {
      expiration := time.Now().Add(30 * 24 * time.Hour)
      cookie := &http.Cookie{Name: "session-token", Value: sessionToken, Expires: expiration, Path: "/"}
      http.SetCookie(w, cookie)
      done <- true
    }()
    go func(){
      cu := User{id, u.Username, u.Nickname}
      log.Println("cu: ", cu)
      SetCurrentUser(sessionToken, cu)
      data, _ = json.Marshal(&cu)
      done <- true
    }()
    for i := 0; i < 2; i++ {
      <-done
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(data)

    break;
  default:
    log.Println("does not match any routes");
    break;
  }
}



func LogOutHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "DELETE":
    cookie, _ := r.Cookie("session-token")

    if cookie.String() != "" {
      newToken, _ := token.GenerateRandomToken(32)
      rows, _ := database.DBConn.Query(`UPDATE users
        SET session_token = $1
        WHERE session_token = $2`, newToken, cookie.Value)
      rows.Close()
      delete(Sessions, cookie.Value)
      cookie = &http.Cookie{Name: "session-token", Value: "", MaxAge: -1, Path: "/" }
      http.SetCookie(w, cookie)
    }
    return;
  default:
    log.Println("does not match any routes");
    break;
  }
}
