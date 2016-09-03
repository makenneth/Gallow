package api 
import (
  "../database"
  "golang.org/x/crypto/bcrypt"
    "../token"
  )
type User struct {
  Username string `json:"username"`
  Password string `json:"password"`
}

type UserData struct {
  id int
  username string
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

func (u *User) resetSessionToken() (string, error) {
  newToken, _ := token.GenerateRandomToken(32)
  _, err := database.DBConn.Query(`UPDATE users 
    SET session_token = $1
    WHERE id = $2`, newToken, u.Username)

  return newToken, err
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


