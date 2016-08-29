import React, { Component } from "react"
import { connect } from "react-redux"
import Diagram from "./diagram"
import Input from "./input"
import Letters from "./letters"

class Game extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hangman</h1>
        <Diagram />
        <Input />
        <Letters />
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Game)