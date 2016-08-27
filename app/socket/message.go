package socket

type Message struct {
  author string `json:"author"`
  body string `json:"body"`
}

func (this *Message) String() string {
  return this.author + " says " + this.body
}

