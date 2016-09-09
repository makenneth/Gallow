import React, { Component } from "react"
import Chat from "./chat/chat"
import Game from "./game/game"
import { connect } from "react-redux"


//so other than the first time...
//there will need to be data checking for the chat messages
//as well as game
//so probably:
// SELECT * FROM games AS g
//  WHERE g.user_id1 == $1 AND g.user_id2 == $1
//  OR g.user_id2 == $2 g.user_id2 == $1
// ok now this doesn't make sense already
// make a join table for game
// INNER JOIN games_messages AS gm
// ON gm.game_id == g.id
// ORDER BY time...
// CAN LIMIT BY 20...


//so props will be passed down to game

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
    this.props.ws.send({
      type: "GAME_CONNECTED",
      data: this.props.params.id
    })
  }

  render() {
    if (!this.props.user){
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <Chat ws={this.props.ws} user={this.props.user} />
      </div>
      )   
  }
}
        // <Game ws={this.props.ws} />


export default connect(null)(GameContainer)