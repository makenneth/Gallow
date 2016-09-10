import React, { Component } from "react"
import { connect } from "react-redux"
import Diagram from "./diagram"
import GameInput from "./gameInput"
import Letters from "./letters"

class Game extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hangman</h1>
        <Diagram guessCount={this.props.game.numberOfGuesses}/>
        <GameInput guesses={this.props.game.correctGuesses}/>
        <Letters usedLetters={this.props.game.usedLetters} 
                 turn={this.props.turn === this.props.user.id}
                 user={this.props.user}
                />
      </div>
      )
  }
}

const mapStateToProps = ({ game }) => {
  return { game };
}

export default connect(mapStateToProps)(Game);