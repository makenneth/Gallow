import React, { Component } from "react"

class Diagram extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.guessCount !== nextProps.guessCount){
      return true;
    } 

    return false;
  }
  render(){
    return (<h1>This is the Diagram</h1>)
  }
}

export default Diagram