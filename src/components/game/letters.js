import React, { Component } from "react"
import Letter from "./letter"
import { connect } from "react-redux"
const alphabets = ["a", "b", "c", "d", "e", 
                   "f", "g", "h", "i", "j", 
                   "k", "l", "m", "n", "o", 
                   "p", "q", "r", "s", "t", 
                   "u", "v", "w", "x", "y", "z"];



class Letters extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.usedLetters.length !== nextProps.usedLetters.length){
      return true;
    }

    return false;
  }
  handleClick = (e) => {
    if (this.props.turn) {
      debugger;
      let gameInfo = this.props.gameInfo;
      this.props.ws.send({
        type: "USER_MOVE",
        data: {
          move: e.target.dataset.letter,
          username1: gameInfo.username1,
          username2: gameInfo.username2,
          userId1: gameInfo.userId1, 
          userId2: gameInfo.userId2, 
          id: gameInfo.id
        }
      })
    }
  }
  render(){
    return (
      <div className="alphabets-container cf" onClick={this.handleClick}>
        {
           alphabets.map(alphabet => {
              let bool = this.props.usedLetters.indexOf(alphabet) > -1;
              return <Letter key={alphabet} used={bool} letter={alphabet} />
           }) 
         }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { gameInfo: state.gameInfo }
}
export default connect(mapStateToProps)(Letters)