package socket

// type Message struct {
//   Author string `json:"author"`
//   Body string `json:"body"`
// }

// func (this *Message) String() string {
//   return this.Author + " says " + this.Body
// }

type Message struct {
  Type string
  Data json.RawMessage
}
