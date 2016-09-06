package main

import (
  "net/http"
  "log"
  "../database"
)
type UserQuery struct {
  id int
  username string
}

func UsersFindHandler(w http.ResponseWriter, r *http.Request) {
  searchQuery := r.URL.Query().Get("name")
  users := make([]UserQuery)
  
  if searchQuery != "" {
    var (
      id int
      username string 
    )

    rows, err := database.DBConn.query(`
      SELECT id, username 
      FROM users
      WHERE username LIKE '%' || $1 || '%'`, searchQuery) 

    for rows.next() {
      err := rows.Scan(&id, &username)
      if err != nil {
        log.Fatal(err)
      }
      users.append(users, &UserQuery{id, username})
    }
  }

  data, err := json.Marshal(users)
  w.Write(data)
}