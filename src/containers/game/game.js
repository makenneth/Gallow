import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Chat, GameScreen } from 'components';
import { clearGame, connectGame } from 'redux/modules/game';
import { setError, clearError } from 'redux/modules/error';

import './game.scss';
import './chat.scss';

@connect(() => ({}), { clearGame, connectGame, setError, clearError })
export default class Game extends Component {
  componentWillMount() {
    if (/^[0-9]+$/.test(this.props.params.id)) {
      this.props.connectGame(this.props.params.id);
    } else {
      browserHistory.push('/');
      this.props.setError('Something went wrong, please try again.');
      setTimeout(() => this.props.clearError(), 2500);
    }
  }

  componentWillUnmount() {
    this.props.clearGame();
  }

  render() {
    return (
      <div className="game-container">
        <GameScreen ws={this.props.ws} user={this.props.user} />
        <Chat />
      </div>
    );
  }
}
