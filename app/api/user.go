package api 
import (
  "log"
  "net/http"
  "time"
  "../database"
  "golang.org/x/crypto/bcrypt"
    "../token"
  )
type User struct {
  Username string `json:"username"`
  Password string `json:"password"`
}

type CurrentUser struct {
  Id int
  Username string
}
var currentUser CurrentUser;

func SetCurrentUser(u CurrentUser){
  currentUser = u
}

func GetCurrentUser(w http.ResponseWriter, userToken string) CurrentUser {
  if currentUser != (CurrentUser{}){
    return currentUser
  }
  bool := FindCurrentUser(w, userToken)
  if !bool {
    return (CurrentUser{})
  }
  return currentUser
}
func FindCurrentUser(w http.ResponseWriter, userToken string) bool {
  var (
    id int
    username string
    )
  newToken, _ := token.GenerateRandomToken(32)
  err := database.DBConn.QueryRow(`UPDATE users
    SET session_token = $1
    WHERE session_token = $2 
    returning id, username`, newToken, userToken).Scan(&id, &username)
  log.Println(err)
  if id == 0 || err != nil {
    return false
  }
  expiration := time.Now().Add(30 * 24 * time.Hour)
  cookie := &http.Cookie{Name: "sessiontokenLit", Value: newToken, Expires: expiration, Path: "/"}
  http.SetCookie(w, cookie)
  if err != nil {
    return false
  }
  SetCurrentUser(CurrentUser{id, username});
  return true
}

func (u *User) checkPassword() error {
  var (
    passwordDigest string
    sessionToken string
  )
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

func (u *User) resetSessionToken() (int, string, error) {
  newToken, _ := token.GenerateRandomToken(32)
  var playerId int
  err := database.DBConn.QueryRow(`UPDATE users 
    SET session_token = $1
    WHERE username = $2 returning id`, newToken, u.Username).Scan(&playerId)

  return playerId, newToken, err
}

func (u *User) InsertUser() (string, int, error) { 

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
    users (session_token, username, password_digest) 
    VALUES ($1, $2, $3) returning id`, token, u.Username, digest).Scan(&newPlayerId)

  return token, newPlayerId, err
}  


