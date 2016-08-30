import React, { Component } from "react"

class GameInput extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.guesses.length !== nextProps.guesses.length){
      return true;
    }

    return false;
  }
  render(){
    return (
      <div>
        { 
          props.guess.split("").map(letter => {
            return (<div key={letter} className="guess-letter">
                {letter}
              </div>)
          })
        }
      </div>)
  }
}

export default GameInput