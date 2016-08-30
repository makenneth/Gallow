import React, { Component } from "react"
import { connect } from "react-redux"
import Diagram from "./diagram"
import GameInput from "./gameInput"
import Letters from "./letters"

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "hello",
      correctGuesses: []
    }
  }
  componentWillReceiveProps(nextProps) {
    let { answer, correctGuesses } = this.state;
    if (answer.indexOf(nextProps.guess) > -1 && 
      correctGuesses.indexOf(nextProps.guess) === -1){
      correctGuesses.push(answer);
      this.setState({ correctGuesses });
    }

  }
  // shouldComponentUpdate(nextProps, nextState) {
    
  // }
  render() {
    return (
      <div>
        <h1>Hangman</h1>
        <Diagram guessCount={this.props.guess.guessCount}/>
        <GameInput guesses={this.state.correctGuesses}/>
        <Letters usedLetters={this.props.guess.guessed}/>
      </div>
      )
  }
}

const mapStateToProps = ({ guess }) => {
  return { guess };
}

export default connect(mapStateToProps)(Game)