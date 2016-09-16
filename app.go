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
  "./app/token"
  "html/template"
  "github.com/namsral/flag"
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

func (handler *RegexHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  for _, route := range handler.routes {
    matches := route.re.FindStringSubmatch(r.URL.Path)
    if matches != nil {
      route.handler(w, r, matches)
      break;
    }
  }
}

func templateHandler(w http.ResponseWriter, r *http.Request){
  cookie, err := r.Cookie("sessiontokenLit")
  if err != nil || cookie.String() == "" {
    http.Redirect(w, r, "/login", http.StatusSeeOther)
    return
  }
  if user := api.GetCurrentUser(w, cookie.Value); user == (api.User{})  {
      log.Println("redirecting to /login from /")
    http.Redirect(w, r, "/login", http.StatusSeeOther)
    return
  }
  
  t, _ := template.ParseFiles("index.html")
  csrf_token, _ := token.GenerateRandomToken(32)
  d := TemplateData{CSRFToken: csrf_token}
  t.Execute(w, d)
}

func LogInPageHandler(w http.ResponseWriter, r *http.Request){
  cookie, _ := r.Cookie("sessiontokenLit")
  if cookie.String() != "" {
    if user := api.GetCurrentUser(w, cookie.Value); user != (api.User{}) {
      log.Println("redirecting to / from /login..")
      http.Redirect(w, r, "/", http.StatusSeeOther)
      return
    }
  }
  t, _ := template.ParseFiles("templates/logInPage.html")
  csrf_token, _ := token.GenerateRandomToken(32)
  d := TemplateData{CSRFToken: csrf_token}
  t.Execute(w, d)
}

func SignUpPageHandler(w http.ResponseWriter, r *http.Request){
  cookie, _ := r.Cookie("sessiontokenLit")
  if cookie.String() != "" {
    
    if user := api.GetCurrentUser(w, cookie.Value); user != (api.User{}){
      http.Redirect(w, r, "/", http.StatusSeeOther)
    }
  }
  t, _ := template.ParseFiles("templates/signUpPage.html")
  csrf_token, _ := token.GenerateRandomToken(32)
  d := TemplateData{CSRFToken: csrf_token}
  t.Execute(w, d)
}


func main() {  
  port_num := 8080
  flag.IntVar(&port_num, "P", port_num, "SERVER PORT")
  dbinfo := DBInfo()
  port := fmt.Sprintf(":%d", port_num)

  api.InitializeSessions()
  var err error
  database.DBConn, err = sql.Open("postgres", dbinfo)
  checkErr(err)
  defer database.DBConn.Close();

	server := socket.NewServer("/ws")
	go server.Listen()

  http.HandleFunc("/public/", func(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, r.URL.Path[1:])
  })

  // regHandler := new(RegexHandler)
  // regHandler.AddRoute("/api/games/([0-9]+)$", api.GameRoutesHandler)
  // regHandler.AddRoute("/api/games/([0-9]+)/messages$", api.MessageRoutesHandler)
  http.HandleFunc("/api/user/games", api.GamesRouteHandler)
  http.HandleFunc("/api/user/new", api.SignUpHandler)
  http.HandleFunc("/api/user", api.UserHandler) 
  http.HandleFunc("/api/user/current", api.CurrentUserHandler) 
  http.HandleFunc("/api/session/new", api.LogInHandler)
  http.HandleFunc("/api/session", api.LogOutHandler)
  http.HandleFunc("/api/games/new", func(w http.ResponseWriter, r *http.Request){
    api.NewGameHandler(w, r, server);
  })
  http.HandleFunc("/api/users", api.UsersQueryHandler) 
  http.HandleFunc("/login", LogInPageHandler)
  http.HandleFunc("/signup", SignUpPageHandler)
  http.HandleFunc("/", templateHandler)
  log.Printf("Server listening at port %d", port_num)
  log.Fatal(http.ListenAndServe(port, nil))
}

func DBInfo() string {
  host, port := "localhost", 5432
  db_user, db_password, db_name := "postgres", "postgres", "hangman"

  flag.IntVar(&port, "p", port, "PORT NUMBER")
  flag.StringVar(&host, "h", host, "HOST")
  flag.StringVar(&db_name, "d", db_name, "DB NAME")
  flag.StringVar(&db_user, "U", db_user, "DB USER")
  flag.StringVar(&db_password, "w", db_password, "DB PASSWORD")
  flag.Parse()

  return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
    host, port, db_user, db_password, db_name)
}
func checkErr(err error) {
  if err != nil {
    panic(err);
  }
}


