package game 


import (
  "../state"
  "log"
  "../database"
)

type Game struct {
  Id int `json:"id"`
  UserId1 int `json:"userId1"`
  UserId2 int `json:"userId2"`
  Username1 string `json:"username1"`
  Username2 string `json:"username2"`
  Nickname1 string `json:"nickname1"`
  Nickname2 string `json:"nickname2"`
  Finished bool `json:"finished"`
  Winner int `json:"winner"`
  State state.State `json:"state"`
}

func (this *Game) Update(guess, word string){
  var correct bool
  done := make(chan bool)
  go func(){
    this.UpdateUsedLetters(guess)
    done <- true
  }()
  go func(){
    correct = this.UpdateCorrectGuesses(guess, word)
    done <- true
  }()
  for i := 0; i < 2; i++ {
    <- done
  }
  go func(){
    if (this.State.Solving && !correct) || !this.State.Solving {
      this.UpdateStats(correct)
    }
    done <- true
  }()
  go func(){
    this.CheckGameEnded()
    done <- true
  }()
  for i := 0; i < 2; i++ {
    <- done
  }
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

func (this *Game) UpdateCorrectGuesses(guess, word string) bool{
  correct := false
  for i, c := range word {
    if string(c) == guess {
      this.State.CorrectGuesses[i] = string(c)
      correct = true
    }
  }

  return correct
}
func (this *Game) CheckGameEnded() {
  ended := true
  for _, c := range this.State.CorrectGuesses {
    if c == "" {
      ended = false
    }
  }

  if ended {
    this.Finished = true
    if this.State.Turn == this.UserId2 {
      this.Winner = this.UserId2
    } else if this.State.Turn == this.UserId1 {
      this.Winner = this.UserId2
    }
  }
}

func (this *Game) UpdateStats(correct bool) {
  if this.State.Turn == this.UserId2 {
    if !correct {
      this.State.WrongGuesses2++
    }
    if this.State.WrongGuesses2 == 6 {
      this.Winner = this.UserId1 
      this.Finished = true
    } else {
      this.State.Turn = this.UserId1
    }
  } else {
    if !correct {
      this.State.WrongGuesses1++
    }
    if this.State.WrongGuesses1 == 6 {
      this.Winner = this.UserId2 
      this.Finished = true
    } else {
      this.State.Turn = this.UserId2
    }
  }
}

func (this *Game) UpdateDatabase(gJson []byte) (string, error){
  var (
    err error
    msgType string
    )
  if this.Finished && this.Winner != 0 {
    _, err = database.DBConn.Query(`
      UPDATE games
      SET game_state = $1,
          winner = $2,
          finished = true
      WHERE id = $3 AND user_id1 = $4 AND user_id2 = $5
    `, gJson, this.Winner, this.Id, this.UserId1, this.UserId2)
    msgType = "GAME_FINISHED"
    //logic now causing the last letter not to show up
  } else {
    _, err = database.DBConn.Query(`
      UPDATE games
      SET game_state = $1
      WHERE id = $2 AND user_id1 = $3 AND user_id2 = $4
    `, gJson, this.Id, this.UserId1, this.UserId2)

    msgType = "MOVE_MADE"
  }

  return msgType, err
}