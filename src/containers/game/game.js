import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Chat, GameScreen } from 'components';
import { clearGame, loadGame  } from 'redux/modules/game';
import { loadPracticeGame, savePracticeGame, clearPracticeGame } from 'redux/modules/games';
import { setError, clearError } from 'redux/modules/error';

import './game.scss';
import './chat.scss';

@connect(() => ({}), {
  clearGame,
  loadGame,
  setError,
  clearError,
  savePracticeGame,
  loadPracticeGame,
  clearPracticeGame
})
export default class Game extends Component {
  componentWillMount() {
    if (/^[0-9]+$/.test(this.props.params.id)) {
      this.props.loadGame(this.props.params.id);
    } else {
      if (/practice/.test(this.props.location.pathname)) {
        this.props.clearPracticeGame(this.props.params.id);
      }
      browserHistory.push('/');
      this.props.setError('Something went wrong, please try again.');
      setTimeout(() => this.props.clearError(), 2500);
    }
  }

  componentWillUnmount() {
    if (/practice/.test(this.props.location.pathname)) {
      this.props.savePracticeGame();
    }
    this.props.clearGame();
  }

  render() {
    const isPractice = /practice/.test(this.props.location.pathname);
    return (
      <div className={`game-container${isPractice ? ' practice' : ''}`}>
        <GameScreen ws={this.props.ws} user={this.props.user} />
        {!isPractice && <Chat />}
      </div>
    );
  }
}
