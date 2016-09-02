package api

import (
  "net/http"
  "log"
  "../database"
  "../token"
  "encoding/json"
  "golang.org/x/crypto/bcrypt"
  "time"
)


func LogInHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "POST":
    decoder := json.NewDecoder(r.Body)
    var u User
    err := decoder.Decode(&u)
    checkErr(err)
    
    var (
      passwordDigest string
      sessionToken string
      )
    err = database.DBConn.QueryRow(`SELECT password_digest, session_token 
      FROM users 
      WHERE username = $1`, u.username).Scan(&passwordDigest, &sessionToken)
    checkErr(err)

    password, digest := []byte(u.password), []byte(passwordDigest)
    err = bcrypt.CompareHashAndPassword(digest, password)
    if err != nil {
      w.Header().Set("Content-Type", "application/json; charset=utf-8");
      w.WriteHeader(http.StatusNotFound)
      resText, _ := json.Marshal("Username/password not correct.")
      w.Write(resText)

      return
    }

    newToken, _ := token.GenerateRandomToken(32)
    _, err = database.DBConn.Query(`UPDATE users 
      SET session_token = $1
      WHERE id = $2`, newToken, u.username)
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
