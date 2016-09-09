import React, { Component } from "react"
import { connect } from "react-redux"
import Diagram from "./diagram"
import GameInput from "./gameInput"
import Letters from "./letters"
import { fetchGame, setGame } from "../../actions/gameActions"
//so game state...
//would have 
//guesses
//number of guesses
//used letters
//correctGuesses
//playerId 1
//playerId 2
//turn
class Game extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   correctGuesses: [] //this should be moved to backend
    // }
  }

  componentWillReceiveProps(nextProps) {
    // let correctGuesses = this.state.correctGuesses,
    //     guess = nextProps.guess.guess,
    //     answer = nextProps.answer;

    // let indexOfGuess = answer.indexOf(guess);
    // if (indexOfGuess > -1 && 
    //   correctGuesses.indexOf(guess) === -1){
    //   for (let i = 0; i < answer.length; i++) {
    //     if (answer[i] === guess){
    //       correctGuesses[i] = guess;
    //     }
    //   }
    // }

    // if (this.props.answer !== answer){
    //   this.state.correctGuesses = [...Array(answer.length)];
    // }

  }

  render() {
    return (
      <div>
        <h1>Hangman</h1>
        <Diagram guessCount={this.props.guess.guessCount}/>
        <GameInput guesses={this.props.correctGuesses}/>
        <Letters usedLetters={this.props.guess.guessed}/>
      </div>
      )
  }
}

const mapStateToProps = ({ games, game }) => {
  return { games, game };
}

export default connect(mapStateToProps, { fetchGame, setGame })(Game);