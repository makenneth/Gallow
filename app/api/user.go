package api 
import (
  // "log"
  "net/http"
  "time"
  "../database"
  "golang.org/x/crypto/bcrypt"
    "../token"
  )
type UserData struct {
  Nickname string `json:"nickname"`
  Username string `json:"username"`
  Password string `json:"password"`
}

type User struct {
  Id int `json:"id"`
  Username string `json:"username"`
  Nickname string `json:"nickname"`
}

var Sessions map[string]User
func InitializeSessions() {
  Sessions = make(map[string]User)
}

func SetCurrentUser(token string, u User){
  Sessions[token] = u
}

func GetCurrentUser(w http.ResponseWriter, userToken string) User {
  if user, ok := Sessions[userToken]; ok {
    return user
  }
  newToken, bool := FindCurrentUser(w, userToken)
  if !bool {
    return (User{})
  }

  return Sessions[newToken]
}
func FindCurrentUser(w http.ResponseWriter, userToken string) (string, bool){
  var (
    id int
    username, nickname string
    expiration time.Time
    )
  newToken, _ := token.GenerateRandomToken(32)
  err := database.DBConn.QueryRow(`UPDATE users
    SET session_token = $1
    WHERE session_token = $2 
    returning id, username, nickname`, newToken, userToken).Scan(&id, &username, &nickname)
  if id == 0 || err != nil {
    return "", false
  }

  expiration = time.Now().Add(30 * 24 * time.Hour)
  cookie := &http.Cookie{Name: "session-token", Value: newToken, Expires: expiration, Path: "/"}
  http.SetCookie(w, cookie)

  SetCurrentUser(newToken, User{id, username, nickname})
  return newToken, true
}

func (u *UserData) CheckPassword() error {
  var passwordDigest, sessionToken string
  err := database.DBConn.QueryRow(`SELECT password_digest, session_token 
    FROM users 
    WHERE username = $1`, u.Username).Scan(&passwordDigest, &sessionToken)

  if err != nil {
    return err
  }

  password, digest := []byte(u.Password), []byte(passwordDigest)
  err = bcrypt.CompareHashAndPassword(digest, password)

  return err
}

func (u *UserData) ResetSessionToken() (int, string, error) {
  newToken, _ := token.GenerateRandomToken(32)
  var playerId int
  err := database.DBConn.QueryRow(`UPDATE users 
    SET session_token = $1
    WHERE username = $2 returning id`, newToken, u.Username).Scan(&playerId)

  return playerId, newToken, err
}

func (u *UserData) InsertUser() (string, int, error) { 

  password := []byte(u.Password)
  digest, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
  if err != nil {
    panic(err)
  }

  token, err := token.GenerateRandomToken(32)
  if err != nil {
    panic(err)
  }

  var newPlayerId int
  err = database.DBConn.QueryRow(`INSERT INTO 
    users (session_token, username, nickname, password_digest) 
    VALUES ($1, $2, $3, $4) returning id`, token, u.Username, u.Nickname, digest).Scan(&newPlayerId)

  return token, newPlayerId, err
}  


