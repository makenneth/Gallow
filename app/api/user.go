package api

import (
  "net/http"
  // "log"
  "../database"
  "golang.org/x/crypto/bcrypt"
  "encoding/json"
  "../token"
  "time"
)
type User struct {
  username string
  password string
}
func GamesRouteHandler(w http.ResponseWriter, r *http.Request) {

}

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
  decoder := json.NewDecoder(r.Body)
  var u User
  err := decoder.Decode(&u)

  token, _ := token.GenerateRandomToken(32)
  password := []byte(u.password)
  digest, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
  if err != nil {
    //status500
    return
  }
  var newPlayerId int
  err = database.DBConn.QueryRow(`INSERT INTO 
    users (session_token, username, password_digest) 
    FROM $1, $2, $3 returning id`, token, u.username, digest).Scan(&newPlayerId)
  if err != nil {
    return
  }

  expiration := time.Now().Add(30 * 24 * time.Hour)
  cookie := http.Cookie{Name: "sessiontokenLit", Value: token, Expires: expiration}

  http.SetCookie(w, &cookie)
    //status ok
}

func UserHandler(w http.ResponseWriter, r *http.Request) {

}
