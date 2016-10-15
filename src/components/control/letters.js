import React, { Component } from "react";
import { connect } from "react-redux";
import Letter from "./letter";

@connect(({ gameInfo }) => ({ gameInfo }))
export default class Letters extends Component {
  constructor(props) {
    super(props);
    this.alphabets = ["a", "b", "c", "d", "e",
                      "f", "g", "h", "i", "j",
                      "k", "l", "m", "n", "o",
                      "p", "q", "r", "s", "t",
                      "u", "v", "w", "x", "y", "z"];
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.usedLetters.length !== nextProps.usedLetters.length ||
      this.props.guesses.length !== nextProps.guesses.length
      || this.props.turn !== nextProps.turn) {
      return true;
    }

    return false;
  }
  handleClick = (e) => {
    if (this.props.turn &&
          this.alphabets.indexOf(e.target.dataset.letter) > -1 &&
          !this.props.gameInfo.finished) {
      const gameInfo = this.props.gameInfo;
      const move = e.target.dataset.letter;
      if (move.length > 1) {
        return;
      }
      this.props.ws.send(JSON.stringify({
        type: "USER_MOVE",
        data: {
          username1: gameInfo.username1,
          username2: gameInfo.username2,
          nickname1: gameInfo.nickname1,
          nickname2: gameInfo.nickname2,
          userId1: gameInfo.userId1,
          userId2: gameInfo.userId2,
          id: gameInfo.id,
          state: {
            guess: move
          }
        }
      }));
    }
  }
  render() {
    return (
      <div className="alphabets-container" onClick={this.handleClick}>
        {
          this.alphabets.map((alphabet) => {
            const bool = this.props.usedLetters.indexOf(alphabet) > -1;
            return <Letter key={alphabet} used={bool} letter={alphabet} />;
          })
        }
      </div>
    );
  }
}
