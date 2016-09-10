package game 


import (
  "../api"
  "../database"
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
  bool := true
  for _, ltr := range this.State.UsedLetters {
    if ltr == guess {
      bool = false
    }
  }

  if !bool {
    append(this.State.UsedLetters, ltr)
  }
}

func (this *Game) UpdateCorrectGuesses(guess string){
  var word string

  err := database.DBConn.QueryRow(`
    SELECT selected_word 
    FROM games
    WHERE id = $1, user_id1 = $2, user_id2 = $3
    `, this.Id, this.UserId1, this.UserId2).Scan(&word)
  for i, c := range word {
    if c == guess {
      this.CorrectGuesses[i] = c
    }
  }
  this.Guess = guess
}

func (this *Game) UpdateStats() {
  if this.Turn == 2 {
    this.NumberOfGuesses2++
    this.Turn = 1
  } else {
    this.NumberOfGuesses1++
    this.Turn = 2
  }
}