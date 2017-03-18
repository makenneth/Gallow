import React, { Component } from 'react';

export default class Diagram extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      return true;
    }

    return false;
  }

  render() {
    const { guessCount1, guessCount2, gameInfo, turn } = this.props;
    const constructDiagram = (count, name, id) => {
      if (!name) {
        return (<div className="diagram" />);
      }

      return (<div className="diagram">
        <h2 className={`${turn === id ? 'bold' : ''}`}>{name}</h2>
        <div
          style={{
            backgroundImage: `url("/public/images/0${count}.png")`,
            backgroundSize: 'cover',
          }}
        />
      </div>);
    };
    return (<div className="diagrams-container">
      { constructDiagram(guessCount1, gameInfo.nickname1, gameInfo.userId1) }
      { constructDiagram(guessCount2, gameInfo.nickname2, gameInfo.userId2) }
    </div>);
  }
}
