import React, { Component } from "react"
import { connect } from "react-redux"
import Diagram from "./diagram"
import GameInput from "./gameInput"
import Letters from "./letters"
import SetAnswer from "./setAnswer"

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctGuesses: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let correctGuesses = this.state.correctGuesses,
        guess = nextProps.guess.guess,
        answer = nextProps.answer;

    let indexOfGuess = answer.indexOf(guess);
    if (indexOfGuess > -1 && 
      correctGuesses.indexOf(guess) === -1){
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess){
          correctGuesses[i] = guess;
        }
      }
    }

    if (this.props.answer !== answer){
      this.state.correctGuesses = [...Array(answer.length)];
    }

  }

  answerForm = () => {
    if (!this.props.answer){
      return <SetAnswer />
    }
  }
  render() {
    return (
      <div>
        <h1>Hangman</h1>
        <Diagram guessCount={this.props.guess.guessCount}/>
        { this.answerForm() }
        <GameInput guesses={this.state.correctGuesses}/>
        <Letters usedLetters={this.props.guess.guessed}/>
      </div>
      )
  }
}

const mapStateToProps = ({ guess, answer }) => {
  return { guess, answer };
}

export default connect(mapStateToProps)(Game);