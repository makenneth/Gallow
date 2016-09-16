import React, { Component } from "react"
import Chat from "./chat/chat"
import Game from "./game/game"
import { connect } from "react-redux"
import { clearGame } from "../actions/gameActions"

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    try {
      this.props.ws.send(JSON.stringify({
        type: "GAME_CONNECTED",
        data: +this.props.params.id
      }))
    } catch(e) {
      this.props.ws.onopen = this.socketOpened;
      this.setState({ loading: false })
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
      )   
  }
}

export default connect(null, { clearGame })(GameContainer)