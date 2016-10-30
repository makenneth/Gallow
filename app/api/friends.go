package api

import (
  "net/http"
  "log"
  "../database"
  "encoding/json"
)

// CREATE TABLE friends (
//  id serial PRIMARY KEY,
//  user_id INT NOT NULL REFERENCES users(id),
//  friend_id INT NOT NULL REFERENCES users(id)
// );

func FriendsHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "POST":
    user, err := GetUserFromCookie(w, r)
    var friendId int
    decoder := json.NewDecoder(r.Body)
    err = decoder.Decode(&friendId)
    if err != nil {
      log.Println("Invalid data")
    }
    _ = database.DBConn.QueryRow(`INSERT INTO friends
      (user_id, friend_id) VALUES
      ($1, $2)`, user.Id, friendId)

    if err != nil {
      log.Println("Saving was unsuccessful")
    }

    w.WriteHeader(http.StatusOK)
    break
  case "GET":
    currentUser, err := GetUserFromCookie(w, r)
    if err != nil {
      log.Println("user not logged in")
      return
    }
    user := &User{}
    friends := make([]*User, 0)
    rows, err := database.DBConn.Query(`
      SELECT u.* FROM friends as f
      WHERE f.user_id = $1
      INNER JOIN user as u
      ON u.user_id = f.friend_id
    `, currentUser.Id)
    defer rows.Close()
    for rows.Next() {
      err := rows.Scan(&user)
      friends = append(friends, user)
      if err != nil {
        log.Println(err)
      }
    }

    data, _ := json.Marshal(friends)
    w.Header().Set("Content-Type", "application/json")
    w.Write(data)
    break
  default:
    log.Println("Invalid method,", r.Method)
  }
}


