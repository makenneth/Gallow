package api 

type Game struct {
  Id int `json:"id"`
  UserId1 int `json:"userId1"`
  UserId2 int `json:"userId2"`
  State *State `json:"state"`
}
type State struct { 
  Turn int `json:"turn"`
  CorrectGuesses []string `json:"correctGuesses"`
  UsedLetters []string `json:"usedLetters"`
  NumberOfGuesses1 int `json:"numberOfGuesses1"`
  NumberOfGuesses2 int `json:"numberOfGuesses2"`
  Guess string `json:"guess"`
}
func newState(word string, turn int) *State {
  correctGuesses := make([]string, len(word))
  usedLetters := make([]string, 0)
  return &State{turn, correctGuesses, usedLetters, 0, 0, ""}
}