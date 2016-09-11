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
        <Diagram guessCount={this.props.user.id === this.props.userId1 ? this.props.game.numberOfGuesses1 : this.props.game.numberOfGuesses1}/>
        <GameInput guesses={this.props.game.correctGuesses || []}/>
        <Letters usedLetters={this.props.game.usedLetters || []} 
                  guesses={this.props.game.correctGuesses || []}
                 turn={this.props.game.turn === this.props.user.id}
                 user={this.props.user}
                 ws={this.props.ws}
                />
      </div>
      )
  }
}

const mapStateToProps = ({ game }) => {
  return { game };
}

export default connect(mapStateToProps)(Game);