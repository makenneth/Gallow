import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import moment from 'moment';
import { loadGames, isGamesLoaded, loadPracticeGames } from 'redux/modules/games';

import './styles.scss';

@asyncConnect([{
  promise: ({ store }) => {
    let promise;
    if (!isGamesLoaded(store.getState())) {
      promise = store.dispatch(loadGames());
      console.log('load practice games');
      store.dispatch(loadPracticeGames());
    }

    return promise;
  },
}])
@connect(
  ({ games }) => ({ games })
  )
export default class Games extends Component {
  handleClick = (e, prefix = '/games') => {
    browserHistory.push(`${prefix}/${e.target.dataset.id}`);
  }

  getStatusText = (game) => {
    if (game.info.finished) {
      return `Result: ${game.info.winner === this.props.user.id ? 'Won' : 'Lost'}`
    }
    return `Turn: ${game.state.turn === this.props.user.id ? 'Player' : 'Computer'}`
  }

  render() {
    const { unfinished, finished, practice } = this.props.games;
    try {
      return (
        <div className="games-container">
          <div>
            <h1>Ongoing Games</h1>
            {
              unfinished.length === 0 &&
                <h2>
                  <div>No ongoing games.</div>
                  <button onClick={() => browserHistory.push('/games/new')}>New game</button>
                </h2>
            }
            <ul onClick={this.handleClick}>
              {
                unfinished.slice(0, 7).map((game =>
                  (<li key={game.id} data-id={game.id} className="draw">
                    {game.nickname1}<span>vs.</span>{game.nickname2}
                    <br />
                    Last Moved: {moment(game.updatedAt).fromNow()}
                  </li>)
                ))
              }
            </ul>
          </div>
          {
            finished.length > 0 &&
            <div>
              <h1>Finished Games</h1>
              <ul onClick={this.handleClick}>
                {
                  finished.slice(0, 5).map((game =>
                    (<li key={game.id} data-id={game.id} className="draw">
                      {game.nickname1}<span>vs.</span>{game.nickname2}
                      <br />
                      { `Result: ${game.winner === this.props.user.id ? 'Won' : 'Lost'}` }
                    </li>)
                  ))
                }
              </ul>
            </div>
          }
          {
            practice.length > 0 &&
            <div>
              <h1>Practice Games</h1>
              <ul onClick={(ev) => this.handleClick(ev, '/games/practice')}>
                {
                  practice.slice(0, 5).map((game =>
                    (<li key={game.info.id} data-id={game.info.id} className="draw">
                      {game.info.nickname1}<span>vs. </span>Computer
                      <br />
                      { this.getStatusText(game) }
                    </li>)
                  ))
                }
              </ul>
            </div>
          }
        </div>
      );
    } catch (e) {
      this.forceUpdate();
      console.warn(e);
      return null;
    }
  }
}
