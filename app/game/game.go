package game 


import (
  "../api"
  "log"
)
type Game struct {
  Id int `json:"id"`
  UserId1 int `json:"userId1"`
  UserId2 int `json:"userId2"`
  Username1 string `json:"username1"`
  Username2 string `json:"username2"`
  State api.State `json:"state"`
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
  for i, c := range word {
    log.Println(i)
    log.Println(c)
    if string(c) == guess {
      this.State.CorrectGuesses[i] = string(c)
    }
  }
  log.Println("state2 ", this.State)
}

func (this *Game) UpdateStats() {
  if this.State.Turn == 2 {
    this.State.NumberOfGuesses2++
    this.State.Turn = 1
  } else {
    this.State.NumberOfGuesses1++
    this.State.Turn = 2
  }
}