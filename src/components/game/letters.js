import React, { Component } from "react"
import Letter from "./letter"
import { connect } from "react-redux"

class Letters extends Component {
  constructor(props) {
    super(props);
    this.alphabets = ["a", "b", "c", "d", "e", 
                      "f", "g", "h", "i", "j", 
                      "k", "l", "m", "n", "o", 
                      "p", "q", "r", "s", "t", 
                      "u", "v", "w", "x", "y", "z"];
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.usedLetters.length !== nextProps.usedLetters.length || 
      this.props.guesses.length !== nextProps.guesses.length
      || this.props.turn !== nextProps.turn){
      return true;
    }

    return false;
  }
  handleClick = (e) => {
    if (this.props.turn && 
          this.alphabets.indexOf(e.target.dataset.letter) > -1 && 
          !this.props.gameInfo.finished) {
      let gameInfo = this.props.gameInfo,
          move = e.target.dataset.letter
      if (move.length > 1){
        console.log("cheater?")
        return;
      }
      this.props.ws.send(JSON.stringify({
        type: "USER_MOVE",
        data: {
          username1: gameInfo.username1,
          username2: gameInfo.username2,
          nickname1: gameInfo.nickname1,
          nickname2: gameInfo.nickname2,
          userId1: gameInfo.userId1, 
          userId2: gameInfo.userId2, 
          id: gameInfo.id,
          state: {
            guess: move
          }
        }
      }))
    }
  }
  render(){
    return (
      <div className="alphabets-container cf" onClick={this.handleClick}>
        {
           this.alphabets.map(alphabet => {
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