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
    var u UserData
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
    cookie := &http.Cookie{Name: "sessiontokenLit", Value: sessionToken, Expires: expiration, Path: "/"}
    log.Println("setting cookie: ", cookie)
    http.SetCookie(w, cookie)
    w.Header().Set("Content-Type", "application/json")
    cu := User{id, u.Username}
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
        SET session_token = $1
        WHERE session_token = $2`, newToken, cookie.Value)
      currentUser = (User{})
      cookie = &http.Cookie{Name: "sessiontokenLit", Value: "", MaxAge: -1, Path: "/" }
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
