import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "./chat/chat";
import Game from "./control/game";
import { clearGame } from "redux/modules/game";

@connect(
  () => ({}),
  { clearGame }
  )
export default class GameContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    try {
      this.props.ws.send(JSON.stringify({
        type: "GAME_CONNECTED",
        data: +this.props.params.id
      }))
    } catch(e) {
      this.props.ws.onopen = this.socketOpened;
    }
  }

  socketOpened = () => {
    this.props.ws.send(JSON.stringify({
      type: "GAME_CONNECTED",
      data: +this.props.params.id
    }))
  }
  componentWillUnmount() {
    this.props.clearGame();
  }
  render() {
    return (
      <div className="game-container">
        <Game ws={this.props.ws} user={this.props.user} />
        <Chat ws={this.props.ws} />
      </div>
    );
  }
}
