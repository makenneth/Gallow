import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(({ gameInfo }) => ({ gameInfo }))
export default class Diagram extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.guessCount1 !== nextProps.guessCount1 ||
      this.props.guessCount2 !== nextProps.guessCount2 ||
      this.props.username1 !== nextProps.username1 ||
      this.props.username2 !== nextProps.username2) {
      return true;
    }

    return false;
  }

  render() {
    const props = this.props;
    const constructDiagram = (count, name) => {
      if (!name) {
        return (<div className="diagram" />);
      }

      return (<div className="diagram">
        <h2>{name}</h2>
        <div
          style={{
            backgroundImage: `url("/public/images/0${count}.png")`,
            backgroundSize: 'cover',
          }}
        />
      </div>);
    };
    return (<div className="diagrams-container">
      { constructDiagram(props.guessCount1, props.gameInfo.nickname1) }
      { constructDiagram(props.guessCount2, props.gameInfo.nickname2) }
    </div>);
  }
}
