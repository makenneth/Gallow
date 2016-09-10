import React, { Component } from "react"
import Chat from "./chat/chat"
import Game from "./game/game"
import { connect } from "react-redux"

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    try {
      this.props.ws.send({
        type: "GAME_CONNECTED",
        data: this.props.params.id
      })
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

  render() {
    //idea... 
    //loading should be abstracted out to a reducer
    //so when something is loading...we can just call that action
    //and we can all share one loader
    return (
      <div>
        <Chat ws={this.props.ws} />
        <Game ws={this.props.ws} user={this.props.user} />
      </div>
      )   
  }
}

export default GameContainer