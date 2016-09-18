package api

import (
  "net/http"
  "log"
  "fmt"
  "encoding/json"
  "time"
  "../token"
  "../csrf"
  "../database"
)

func LogInHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "POST":
    var (
      u UserData
      data []byte
      )

    validRequest := csrf.CheckCSRF(r)
    if !validRequest {
      w.WriteHeader(http.StatusForbidden);
      fmt.Fprintf(w, "<html><head></head><body><h1>403 - Forbidden Access</h1><p>Access to this resource is denied!</p></body></html>")
      return
    }

    done := make(chan bool)
    decoder := json.NewDecoder(r.Body)
    err := decoder.Decode(&u)
    checkErr(err)

    err = u.CheckPassword()

    if err != nil {
      w.Header().Set("Content-Type", "application/json; charset=utf-8");
      w.WriteHeader(http.StatusNotFound)
      resText, _ := json.Marshal("Username/password not correct.")
      w.Write(resText)

      return
    }

    checkErr(err)
    id, sessionToken, err := u.ResetSessionToken()
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
      _, _ = database.DBConn.Query(`UPDATE users
        SET session_token = $1
        WHERE session_token = $2`, newToken, cookie.Value)
      delete(Sessions, cookie.Value)
      cookie = &http.Cookie{Name: "session-token", Value: "", MaxAge: -1, Path: "/" }
      http.SetCookie(w, cookie)
    }
    // log.Println("logout redirecting...")
    // http.Redirect(w, r, "/login", http.StatusSeeOther)
    return;
  default: 
    log.Println("does not match any routes");
    break;
  }
}
