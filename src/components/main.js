import React, { Component } from "react"
import NavBar from "./navBar"
class Main extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Gallows</h2>
        <NavBar />
        { this.props.children }
      </div>
      )
  }
}

export default Main
