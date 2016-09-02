import React, { Component } from "react"
import Letter from "./letter"

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

  render(){
    return (
      <div className="alphabets-container cf">
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

export default Letters