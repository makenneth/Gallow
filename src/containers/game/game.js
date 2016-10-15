import React, { Component } from "react";
import { connect } from "react-redux";
import { Chat, GameScreen } from "components";
import { clearGame } from "redux/modules/game";

@connect(() => ({}), { clearGame })
export default class Game extends Component {
  componentWillMount() {
    try {
      this.props.ws.send(JSON.stringify({
        type: "GAME_CONNECTED",
        data: +this.props.params.id
      }));
    } catch (e) {
      this.props.ws.onopen = this.socketOpened;
    }
  }
  componentWillUnmount() {
    this.props.clearGame();
  }
  socketOpened = () => {
    this.props.ws.send(JSON.stringify({
      type: "GAME_CONNECTED",
      data: +this.props.params.id
    }));
  }

  render() {
    return (
      <div className="game-container">
        <GameScreen ws={this.props.ws} user={this.props.user} />
        <Chat ws={this.props.ws} />
      </div>
    );
  }
}
