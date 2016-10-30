package main

import (
  "encoding/json"
  "net/http"
  "log"
  "fmt"
  "net"
  "database/sql"
  _ "github.com/lib/pq"
  "github.com/namsral/flag"
  "./socket"
  "./app/database"
)

type RPCMessage struct {
  Type string
  Data json.RawMessage
  Dest string
}

func main() {
  port := ":8081"
  dbinfo := DBInfo()
  // port := fmt.Sprintf(":%d", port_num)

  var err error
  database.DBConn, err = sql.Open("postgres", dbinfo)
  checkError(err)
  defer database.DBConn.Close();
  server := socket.NewServer("/ws")
  go server.Listen(port)
  go listenTCP(server)
  log.Fatal(http.ListenAndServe(port, nil))

}
func listenTCP(server *socket.Server) {
  tcpAddr, err := net.ResolveTCPAddr("tcp4", ":8082")
  checkError(err)

  listener, err := net.ListenTCP("tcp", tcpAddr)
  checkError(err)

  for {
    conn, err := listener.Accept()

    if err != nil {
      log.Println(err)
      continue
    }

    go handleRPC(conn, server)
  }
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
func handleRPC(conn net.Conn, server *socket.Server) {
  defer conn.Close()
  var buf [512]byte
  for {
    n, err := conn.Read(buf[0:])
    if err != nil {
      continue
    }
    data := buf[0:n]
    var rpcMessage RPCMessage
    err = json.Unmarshal(data, &rpcMessage)
    if err != nil {
      continue
    }

    server.RPCSendToClient(rpcMessage.Type, rpcMessage.Data, rpcMessage.Dest)
  }
}

func checkError(err error) {
  if err != nil {
    log.Fatal(err)
  }
}