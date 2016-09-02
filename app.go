package main

import (
  "fmt"
	"log"
	"net/http"
	"./app/socket"
  "./app/api"
  "database/sql"
  _ "github.com/lib/pq"
  "regexp"
  "./app/database"
)

const (
  DB_USER = "postgres"
  DB_PASSWORD = "postgres"
  DB_NAME = "test"
)
type route struct {
  re *regexp.Regexp
  handler func(http.ResponseWriter, *http.Request, []string)
}

type RegexHandler struct {
  routes []*route
}

func (handler *RegexHandler) AddRoute(reg string, h func(http.ResponseWriter, *http.Request, []string)) {
  route := &route{regexp.MustCompile(reg), h}
  handler.routes = append(handler.routes, route)
}

func (handler *RegexHandler) HandleRoutes(w http.ResponseWriter, r *http.Request) {
  for _, route := range handler.routes {
    //need to test whether r.url.path would work..
    matches := route.re.FindStringSubmatch(r.URL.Path)
    if matches != nil {
      route.handler(w, r, matches)
      break;
    }
  }
}

func ReactHandler(w http.ResponseWriter, r *http.Request) {
  http.ServeFile(w, r, "index.html")
}

func StaticFileHandler(w http.ResponseWriter, r *http.Request) {
  http.ServeFile(w, r, r.URL.Path[1:])
}

func main() {
  dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disabled",
    DB_USER, DB_PASSWORD, DB_NAME)
  var err error
  database.DBConn, err = sql.Open("postgres", dbinfo)
  checkErr(err)
  log.Println("db connected...")
  defer database.DBConn.Close();

	server := socket.NewServer("/chat")
	go server.Listen()

  http.HandleFunc("/public/", func(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, r.URL.Path[1:])
  })

  regHandler := new(RegexHandler)
  regHandler.AddRoute("/games/([0-9]+)$", api.GameRoutesHandler)
  regHandler.AddRoute("/games/([0-9]+)/messages$", api.MessageRoutesHandler)

  http.HandleFunc("/user/games", api.GamesRouteHandler)
  http.HandleFunc("/user/new", api.SignUpHandler)
  http.HandleFunc("/user", api.UserHandler) 
  http.HandleFunc("/session/new", api.LogInHandler)
  http.HandleFunc("/session", api.LogOutHandler)
  http.HandleFunc("/games", api.NewGameHandler)
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
    http.ServeFile(w, r, "index.html")
  })
  log.Println("Server listening at port 8080")
  log.Fatal(http.ListenAndServe(":8080", nil))
}


func checkErr(err error) {
  if err != nil {
    panic(err);
  }
}


