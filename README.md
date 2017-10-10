## Hangperson (has been taken down permanently)
Realtime online two-player Hangman with chat functionality.
Built with a Golang backend and a React/Redux frontend.

## Stack
- Frontend: React/Redux
- Backend: Golang
- Database: PostgreSQL
- Server: AWS EC2 and Nginx

## Implementation

### Websockets
- Every time a client connects to the websocket server, a go routine is started to handle write.

```go
  // server.go
  onConnect := func(ws *websocket.Conn){
    client := NewClient(ws, this)
    client.Listen()
    defer ws.Close()
  }

  http.HandleFunc(this.path, func(w http.ResponseWriter, r *http.Request){
    s := websocket.Server{Handler: websocket.Handler(onConnect)}
    s.ServeHTTP(w, r)
  })
  ...

 // client.go
  func (this *Client) Listen() {
    go this.ListenWrite()
    this.ListenRead()
  }
```

- Due to the nature of goroutines, communications between the server and client handlers are done via channels.
- Messages are only directed to targeted recipients, a message will include the usernames of the destinated users. The server maintains a map in memory mapping the usernames to client's channel.
```go
  // client.go
  // this method allows server to send a message to client through a public method
  func (this *Client) Write() chan<- *Message {
    return (chan<- *Message)(this.msgCh)
  }

  ....
  for {
    select {
    case msg := <- this.msgCh:
      websocket.JSON.Send(this.ws, msg)
      break;
    }
  }

  // server.go
  for {
    select {
    case msg := <- this.send:
      for _, username := range msg.Dest {
        if cl, ok := this.clients[username]; ok {
          cl.Write() <- msg.Message
        }
      }
    }
```

### Redux
- Message delivery to the server is handled by a middleware in redux. To send a messgae, we simply dispatch the action with the correct type.
```js
// redux/modules/messages.js
export const sendNewMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    payload: message,
  };
};

// redux/websocketMiddleware.js
export const socketMiddleware = store => next => action => {
  switch (action.type) {
    case SEND_MESSAGE:
      socket.send(JSON.stringify({
        type: 'NEW_MESSAGE',
        data: action.payload,
      }));
    ...
  }
}
```
- When a message is received from the websocket server, a redux action is dispatched and thereby changing the game state.

```js
  const messageHandler = (res) => {
    const message = JSON.parse(res.data);
    switch (message.type) {
      ...
      case 'NEW_MESSAGE':
        dispatch(addNewMessage(message.data));
        break;
    ...
    }
  };
  socket.onmessage = messageHandler;
 ```
## TODO
- [x] CSRF
- [x] Add error channel
- [x] Add dictionary
- [ ] Friend Feature
