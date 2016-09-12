package game 


import (
  "../state"
  "log"
)
//not sure where to place finished
type Game struct {
  Id int `json:"id"`
  UserId1 int `json:"userId1"`
  UserId2 int `json:"userId2"`
  Username1 string `json:"username1"`
  Username2 string `json:"username2"`
  Nickname1 string `json:"nickname1"`
  Nickname2 string `json:"nickname2"`
  Finished bool `json:"finished"`
  State state.State `json:"state"`
}

func (this *Game) UpdateUsedLetters(guess string){
  used := false
  for _, ltr := range this.State.UsedLetters {
    if string(ltr) == guess {
      used = true
      break;
    }
  }

  if !used {
    this.State.UsedLetters = append(this.State.UsedLetters, guess)
    log.Println("state1 ", this.State)
  }
}

func (this *Game) UpdateCorrectGuesses(guess, word string){
  correct := false
  for i, c := range word {
    log.Println(i)
    log.Println(c)
    if string(c) == guess {
      this.State.CorrectGuesses[i] = string(c)
      correct = true
    }
  }
  this.UpdateStats(correct)
  log.Println("state2 ", this.State)
}

func (this *Game) UpdateStats(correct bool) {
  if this.State.Turn == this.UserId2 {
    if !correct {
      this.State.WrongGuesses2++
    }
    this.State.Turn = this.UserId1
  } else {
    if !correct {
      this.State.WrongGuesses1++
    }
    this.State.Turn = this.UserId2
  }
}