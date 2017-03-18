import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import moment from 'moment';
import { loadGames, isGamesLoaded } from 'redux/modules/games';

import './styles.scss';

@asyncConnect([{
  promise: ({ store }) => {
    let promise;
    if (!isGamesLoaded(store.getState())) {
      promise = store.dispatch(loadGames());
    }

    return promise;
  },
}])
@connect(
  ({ games }) => ({ games })
  )
export default class Games extends Component {
  handleClick = (e) => {
    browserHistory.push(`/games/${e.target.dataset.id}`);
  }

  render() {
    return (
      <div className="games-container">
        <div>
          <h1>Ongoing Games</h1>
          <ul onClick={this.handleClick}>
            {
              this.props.games.unfinished.slice(0, 7).map((game =>
                (<li key={game.id} data-id={game.id} className="draw">
                  {game.nickname1}<span>vs.</span>{game.nickname2}
                  <br />
                  Last Moved: {moment(game.updatedAt).fromNow()}
                </li>)
              ))
            }
          </ul>
        </div>
        <div>
          <h1>Finished Games</h1>
          <ul onClick={this.handleClick}>
            {
              this.props.games.finished.slice(0, 5).map((game =>
                (<li key={game.id} data-id={game.id} className="draw">
                  {game.nickname1}<span>vs.</span>{game.nickname2}
                  <br />
                  { `Result: ${game.winner === this.props.user.id ? 'Won' : 'Lost'}` }
                </li>)
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
