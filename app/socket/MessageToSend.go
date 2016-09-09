package socket

type InterclientMessage struct {
  Dest []string
  Message *Message
}