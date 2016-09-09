import React, { Component } from "react"

class Letter extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.used !== nextProps.used){
      return true;
    }

    return false
  }
  render(){
    let className = "letter-box" + (props.used ? " used" : "");
    return (
      <div data-letter={ props.letter } className={className}>
        <p>{ props.letter }</p>
      </div>
      )
  }
}




export default Letter;