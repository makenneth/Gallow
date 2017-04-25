import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeMove } from 'redux/modules/game';
import { makeGuess } from 'redux/modules/practice_game';
import Letter from './letter';

@connect(({ gameInfo }) => ({ gameInfo }), { makeMove, makeGuess })
export default class Letters extends Component {
  constructor(props) {
    super(props);
    this.alphabets = ['a', 'b', 'c', 'd', 'e',
                      'f', 'g', 'h', 'i', 'j',
                      'k', 'l', 'm', 'n', 'o',
                      'p', 'q', 'r', 's', 't',
                      'u', 'v', 'w', 'x', 'y', 'z'];
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.turn !== nextProps.turn && nextProps.turn === -1) {
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

  handleClick = (e) => {
    if (this.props.turn &&
          this.alphabets.indexOf(e.target.dataset.letter) > -1 &&
          !this.props.gameInfo.finished) {
      const move = e.target.dataset.letter;
      if (move.length !== 1) {
        return;
      }
      if (/practice/.test(window.location.pathname)) {
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
