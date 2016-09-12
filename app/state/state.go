package state

type State struct { 
  Turn int `json:"turn"`
  CorrectGuesses []string `json:"correctGuesses"`
  UsedLetters []string `json:"usedLetters"`
  WrongGuesses1 int `json:"wrongGuesses1"`
  WrongGuesses2 int `json:"wrongGuesses2"`
  Guess string `json:"guess"`
  Finished bool `json:"finished"`
}


func NewState(word string, turn int) *State {
  correctGuesses := make([]string, len(word))
  usedLetters := make([]string, 0)
  return &State{turn, correctGuesses, usedLetters, 0, 0, "", false}
}