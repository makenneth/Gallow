package api

import (
  "encoding/json"
  "net/http"
  "log"
  "../database"
)


func UsersQueryHandler(w http.ResponseWriter, r *http.Request) {
  switch r.Method {
  case "GET":
    searchQuery := r.URL.Query().Get("name")
    log.Println("query: ", searchQuery)
    users := make([]User, 0)

    if searchQuery != "" {
      var (
        id int
        username string 
        nickname string
      )

      rows, err := database.DBConn.Query(`
        SELECT id, username, nickname 
        FROM users
        WHERE username LIKE '%' || $1 || '%'`, searchQuery) 
      if err != nil {
        log.Println(err)
        break;
      }
      for rows.Next() {
        err := rows.Scan(&id, &username, &nickname)
        if err != nil {
          log.Println(err)
          break;
        }
        users = append(users, User{id, username, nickname})
      }
    }
    
    data, err := json.Marshal(users)
    if err != nil {
      log.Fatal(err)
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(data);
    break;
  default:
    log.Println("invalid routes");
    break;
  }

}