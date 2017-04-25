import React, { Component } from 'react';

export default class Diagram extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }

    return false;
  }

  constructDiagram(count, name, isCurrentPlayer) {
    if (!name) {
      return (<div className="diagram" />);
    }

    return (<div className="diagram">
      <h2 className={`${isCurrentPlayer ? 'bold' : ''}`}>{name}</h2>
      <div
        style={{
          backgroundImage: `url("/public/images/0${count}.png")`,
          backgroundSize: 'cover',
        }}
      />
    </div>);
  };

  render() {
    const { guessCount1, guessCount2, gameInfo, turn } = this.props;
    console.log(gameInfo);
    return (<div className="diagrams-container">
      { this.constructDiagram(guessCount1, gameInfo.nickname1, gameInfo.userId1 === turn) }
      { this.constructDiagram(guessCount2, gameInfo.nickname2, gameInfo.userId2 === turn) }
    </div>);
  }
}
