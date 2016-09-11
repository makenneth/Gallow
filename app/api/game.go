package api 

//add username1/username2
//so we can use the same game struct
//and thus remove circularity
type Game struct {
  Id int `json:"id"`
  UserId1 int `json:"userId1"`
  UserId2 int `json:"userId2"`
  State *State `json:"state"`
}

//todo...abstract out state
//and thus remove circularity
type State struct { 
  Turn int `json:"turn"`
  CorrectGuesses []string `json:"correctGuesses"`
  UsedLetters []string `json:"usedLetters"`
  WrongGuesses1 int `json:"wrongGuesses1"`
  WrongGuesses2 int `json:"wrongGuesses2"`
  Guess string `json:"guess"`
}
func newState(word string, turn int) *State {
  correctGuesses := make([]string, len(word))
  usedLetters := make([]string, 0)
  return &State{turn, correctGuesses, usedLetters, 0, 0, ""}
}