import React, { Component } from "react"

class GameInput extends Component {
  constructor(props) {
    super(props);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.guesses.length !== nextProps.guesses.length){
  //     return true;
  //   }

  //   return false;
  // }
  render(){
    return (
      <div className="correct-container cf">
        { 
          this.props.guesses.map((letter, i) => {
            let style = "guess-letter" + ( letter ? "" : " empty");
            return (<div key={letter + " " + i} className={style}>
                { letter }
              </div>)
          })
        }
      </div>)
  }
}

export default GameInput