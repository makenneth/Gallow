import React, { Component } from "react";
import { connect } from "react-redux";
import Diagram from "./diagram";
import GameInput from "./gameInput";
import Letters from "./letters";
import { toggleChat } from "redux/modules/chat";

@connect(
  ({ game, gameInfo }) => ({ game, gameInfo })
  )

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    if (this.props.game.turn === this.props.user.id &&
      !this.props.game.solving) {
      this.props.ws.send(JSON.stringify({
        type: "SOLVE_GAME",
        data: {
          id: this.props.gameInfo.id,
          userId: this.props.user.id
        }
      }));
    }
  }

  render() {
    const game = this.props.game;
    return (
      <div className="game-screen">
        <Diagram guessCount1={game.wrongGuesses1}
                 guessCount2={game.wrongGuesses2} />
        <GameInput guesses={game.correctGuesses || []} />
        <div className="button-div">
          <button className="solve-it"
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
          ws={this.props.ws}
        />
      </div>
    );
  }
}