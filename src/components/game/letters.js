import React, { Component } from "react"
import Letter from "./letter"
import { userGuess } from "../../actions/gameActions"
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
    debugger;
    //make sure the target value is correct
    this.props.ws.send({
      type: "USER_MOVE",
      data: {
        move: e.target.dataset.letter,
        username1: this.props.user.username,
        username2: this.props.opponent.username,
        userId1: this.props.user.id, //why is this needed?
        userId2: this.props.opponent.id, //maybe username
        id: this.props.params.id
      }
    })
    this.props.userGuess(e.target.dataset.letter);
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

export default connect(null, { userGuess })(Letters)