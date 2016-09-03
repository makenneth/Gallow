package main

import (
  "fmt"
	"log"
	"net/http"
	// "./app/socket"
  "./app/api"
  "database/sql"
  _ "github.com/lib/pq"
  "regexp"
  "./app/database"
  "./app/token"
  "http/template"
)

const (
  DB_USER = "postgres"
  DB_PASSWORD = "postgres"
  DB_NAME = "hangman"
)
type route struct {
  re *regexp.Regexp
  handler func(http.ResponseWriter, *http.Request, []string)
}

type RegexHandler struct {
  routes []*route
}
type TemplateData struct {
  CSRFToken string
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

func templateHandler(w http.ResponseWriter, r *http.Request){
    t := template.ParseFiles("index.html")
    d := TemplateData{CSRFToken: token.GenerateRandomToken(32)}
    t.Execute(w, d)
}

func LogInPageHandler(w http.ResponseWriter, r *http.Request){
  t := template.ParseFiles("templates/logInPage.html")
  d := TemplateData{CSRFToken: token.GenerateRandomToken(32)}
  t.Execute(w, d)
}

func LogInPageHandler(w http.ResponseWriter, r *http.Request){
  t := template.ParseFiles("templates/signUpPage.html")
  d := TemplateData{CSRFToken: token.GenerateRandomToken(32)}
  t.Execute(w, d)
}

func main() {
  dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
    DB_USER, DB_PASSWORD, DB_NAME)
  var err error
  database.DBConn, err = sql.Open("postgres", dbinfo)
  checkErr(err)
  log.Println("db connected...")
  defer database.DBConn.Close();

	// server := socket.NewServer("/chat")
	// go server.Listen()

  http.HandleFunc("/public/", func(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, r.URL.Path[1:])
  })

  regHandler := new(RegexHandler)
  regHandler.AddRoute("/api/games/([0-9]+)$", api.GameRoutesHandler)
  regHandler.AddRoute("/api/games/([0-9]+)/messages$", api.MessageRoutesHandler)

  http.HandleFunc("/api/user/games", api.GamesRouteHandler)
  http.HandleFunc("/api/user/new", api.SignUpHandler)
  http.HandleFunc("/api/user", api.UserHandler) 
  http.HandleFunc("/api/session/new", api.LogInHandler)
  http.HandleFunc("/api/session", api.LogOutHandler)
  http.HandleFunc("/api/games", api.NewGameHandler)
  http.HandleFunc("/login", LogInPageHandler)
  http.HandleFunc("/signup", SignUpPageHandler)
  http.HandleFunc("/", templateHandler)
  log.Println("Server listening at port 8080")
  log.Fatal(http.ListenAndServe(":8080", nil))
}


func checkErr(err error) {
  if err != nil {
    panic(err);
  }
}


