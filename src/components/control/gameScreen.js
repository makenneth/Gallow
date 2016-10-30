import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleChat } from "redux/modules/chat_screen";
import { solveGame } from "redux/modules/game";
import Diagram from "./diagram";
import GameInput from "./gameInput";
import Letters from "./letters";

@connect(
  ({ game }) => ({ game }),
  { toggleChat, solveGame }
)
export default class GameScreen extends Component {
  handleClick = () => {
    if (this.props.game.turn === this.props.user.id &&
      !this.props.game.solving) {
      this.props.solveGame();
    }
  }

  render() {
    const game = this.props.game;
    return (
      <div className="game-screen">
        <Diagram
          guessCount1={game.wrongGuesses1}
          guessCount2={game.wrongGuesses2}
        />
        <GameInput guesses={game.correctGuesses || []} />
        <div className="button-div">
          <button
            className="solve-it"
            onClick={this.handleClick}
            disabled={game.solving}
          >Solve it</button>
          <button
            className="open-chat"
            onClick={() => this.props.toggleChat()}
          >Chat</button>
        </div>
        <Letters
          usedLetters={game.usedLetters || []}
          guesses={game.correctGuesses || []}
          turn={game.turn === this.props.user.id}
          user={this.props.user}
        />
      </div>
    );
  }
}
