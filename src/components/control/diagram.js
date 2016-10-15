import React, { Component } from "react";
import { connect } from "react-redux";

@connect(({ gameInfo }) => ({ gameInfo }))
export default class Diagram extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.guessCount1 !== nextProps.guessCount1 ||
      this.props.guessCount2 !== nextProps.guessCount2 ||
      this.props.username1 !== nextProps.username1 ||
      this.props.username2 !== nextProps.username2) {
      return true;
    }

    return false;
  }

  constructDiagram(count, name) {
    if (!name) {
      return (<div className="diagram"></div>);
    }
    return (<div className="diagram">
      <h2>{ name }</h2>
      <div
        style={{
          backgroundImage: `url("/public/images/0${count}.png")`,
          backgroundSize: "cover"
        }}
      />
    </div>);
  }
  render() {
    const props = this.props;
    return (<div className="diagrams-container">
      { this.constructDiagram(props.guessCount1, props.gameInfo.nickname1) }
      { this.constructDiagram(props.guessCount2, props.gameInfo.nickname2) }
    </div>);
  }
}
