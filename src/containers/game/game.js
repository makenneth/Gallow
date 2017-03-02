import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chat, GameScreen } from 'components';
import { clearGame, connectGame } from 'redux/modules/game';

import './game.css';
import './chat.css';

@connect(() => ({}), { clearGame, connectGame })
export default class Game extends Component {
  componentWillMount() {
    this.props.connectGame(this.props.params.id);
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
