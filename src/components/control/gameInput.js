import React, { Component } from 'react';

export default class GameInput extends Component {
  shouldComponentUpdate(nextProps) {
    if (!this.props.guesses && !nextProps.guesses) {
      return false;
    }
    let bool = false;
    (function isDifferent(word1, word2) {
      for (let i = 0; i < word2.length; i++) {
        if (word2[i] !== word1[i]) {
          bool = true;
          break;
        }
      }
    }(this.props.guesses, nextProps.guesses));

    return bool;
  }
  render() {
    return (
      <div className="correct-container cf">
        {
          this.props.guesses.map((letter, i) => {
            const style = `guess-letter${letter ? '' : ' empty'}`;
            return (<div key={`${letter} ${i}`} className={style}>
              { letter.toUpperCase() }
            </div>);
          })
        }
      </div>
    );
  }
}
