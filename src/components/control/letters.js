import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeMove } from 'redux/modules/game';
import { savePracticeGame } from 'redux/modules/games';
import { makeGuess } from 'redux/modules/practice_game';
import Letter from './letter';

@connect(({ gameInfo, game }) => ({ gameInfo, currentTurn: game.turn }),
  { makeMove, makeGuess, savePracticeGame })
export default class Letters extends Component {
  constructor(props) {
    super(props);
    this.alphabets = ['a', 'b', 'c', 'd', 'e',
                      'f', 'g', 'h', 'i', 'j',
                      'k', 'l', 'm', 'n', 'o',
                      'p', 'q', 'r', 's', 't',
                      'u', 'v', 'w', 'x', 'y', 'z'];
  }

  componentDidMount() {
    if (this.props.currentTurn === -1 && !this.props.gameInfo.finished) {
      this.props.makeGuess(null, true);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.usedLetters.length !== nextProps.usedLetters.length ||
      this.props.guesses.length !== nextProps.guesses.length
      || this.props.turn !== nextProps.turn) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    if (/practice/.test(location.pathname)) {
      this.props.savePracticeGame();
    }

    if (this.props.currentTurn === -1 && !this.props.gameInfo.finished) {
      setTimeout(() => this.props.makeGuess(null, true), 2000);
    }
  }

  handleClick = (e) => {
    if (this.props.turn &&
          this.alphabets.indexOf(e.target.dataset.letter) > -1 &&
          !this.props.gameInfo.finished) {
      const move = e.target.dataset.letter;
      if (move.length !== 1) {
        return;
      }
      if (/practice/.test(location.pathname)) {
        this.props.makeGuess(move);
      } else {
        this.props.makeMove(move);
      }
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
