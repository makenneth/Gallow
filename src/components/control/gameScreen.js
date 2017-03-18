import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleChat } from 'redux/modules/chat_screen';
import { solveGame } from 'redux/modules/game';
import Diagram from './diagram';
import GameInput from './gameInput';
import Letters from './letters';

@connect(
  ({ game, gameInfo }) => ({ game, gameInfo }),
  { toggleChat, solveGame }
)
export default class GameScreen extends Component {
  handleClick = () => {
    if (this.props.game.turn === this.props.user.id &&
      !this.props.game.solving) {
      this.props.solveGame();
    }
  }
  toggleChat = (ev) => {
    ev.stopPropagation();
    this.props.toggleChat();
  }

  render() {
    const { game, gameInfo } = this.props;
    let curPlayer = gameInfo.nickname1;
    if (game.turn === gameInfo.userId2) {
      curPlayer = gameInfo.nickname2;
    }
    return (
      <div className="game-screen">
        <Diagram
          gameInfo={this.props.gameInfo}
          guessCount1={game.wrongGuesses1}
          guessCount2={game.wrongGuesses2}
          turn={game.turn}
        />
        <GameInput guesses={game.correctGuesses || []} />
        <div className="button-div">
          <button
            className="solve-it"
            onClick={this.handleClick}
            disabled={game.solving}
          >Solve it</button>
          <div>It's {curPlayer}'s turn</div>
          <button
            className="open-chat"
            onClick={this.toggleChat}
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
