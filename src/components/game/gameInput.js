import React, { Component } from "react"



class GameInput extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.guesses && !nextProps.guesses){
      return false;
    }
    let bool = false;
    (function(word1, word2){
      for (var i = 0; i < word2.length; i++){
        if (word2[i] !== word1[i]){
          bool = true;
          break;
        }
      }
    })(this.props.guesses, nextProps.guesses);

    return bool;
  }
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