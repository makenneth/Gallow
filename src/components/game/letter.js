import React, { Component } from "react"

class Letter extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.letter != nextProps.letter || this.props.used !== nextProps.used){
      return true;
    }

    return false
  }
  render(){
    let className = "letter-box" + (this.props.used ? " used" : "");
    return (
      <div data-letter={ this.props.letter } className={className}>
        <div data-letter={ this.props.letter }>{ this.props.letter.toUpperCase() }</div>
      </div>
      )
  }
}




export default Letter;