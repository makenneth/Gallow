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
    var game = this.props.game;
    return (
      <div className="game-screen">
        <Diagram guessCount1={game.wrongGuesses1}
                 guessCount2={game.wrongGuesses2}/>
        <GameInput guesses={game.correctGuesses || []}/>
        <Letters usedLetters={game.usedLetters || []} 
                 guesses={game.correctGuesses || []}
                 turn={game.turn === this.props.user.id}
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