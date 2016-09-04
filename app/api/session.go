package api

import (
  "net/http"
  "log"
  "encoding/json"
  "time"
  "io/ioutil"
  "../token"
  "../database"
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

    id, sessionToken, err := u.resetSessionToken()
    checkErr(err)
    expiration := time.Now().Add(30 * 24 * time.Hour)
    cookie := http.Cookie{Name: "sessiontokenLit", Value: sessionToken, Expires: expiration}
    http.SetCookie(w, &cookie)
    w.Header().Set("Content-Type", "application/json")
    cu := CurrentUser{id, u.Username}
    SetCurrentUser(cu)
    data, _ := json.Marshal(&cu)
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
    cookie, _ := r.Cookie("sessiontokenLit")    
    
    if cookie.String() != "" {
      newToken, _ := token.GenerateRandomToken(32)  
      _, _ = database.DBConn.Query(`UPDATE users
        (session_token) VALUES $1
        WHERE session_token = $2`, newToken, cookie.Value)
      currentUser = (CurrentUser{})
      cookie = &http.Cookie{Name: "sessiontokenLit", Value: "", MaxAge: -1 }
      http.SetCookie(w, cookie)
    }
    http.Redirect(w, r, "/login", http.StatusSeeOther)
    break;
  default: 
    log.Println("does not match any routes");
    break;
  }
}
