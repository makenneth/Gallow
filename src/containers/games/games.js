import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchGames } from "redux/modules/games";
import { startLoading, stopLoading } from "redux/modules/loading";
import { setError } from "redux/modules/error";

@connect(
  ({ games }) => ({ games }),
  { fetchGames, startLoading, stopLoading, setError }
  )
export default class Games extends Component {
  constructor(props, context) {
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  componentDidMount() {
    if (this.props.user.id && !this.props.games.fetched){
      this.props.fetchGames();
      this.props.startLoading(this.props.setError);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.games.fetched && nextProps.games.fetched){
      this.props.stopLoading();
    }
    if ((!this.props.user && nextProps.user) ||
          (this.props.user && nextProps.user.id !== this.props.user.id)){
        this.props.fetchGames();
        this.props.startLoading(this.props.setError);
    }
  }
  handleClick = (e) => {
    this.context.router.push(`/games/${e.target.dataset.id}`);
  }

  render() {
    return (
      <div className="games-container">
        <div>
          <h1>Ongoing Games</h1>
          <ul onClick={this.handleClick}>
            {
              this.props.games.unfinished.map( game => {
                return <li key={game.id} data-id={game.id}>
                  {game.nickname1}<span>vs.</span>{game.nickname2}
                  <br />
                  Last Moved: {moment(game.updatedAt).fromNow()}
                </li>
              })
            }
          </ul>
        </div>
        <div>
          <h1>Finished Games</h1>
          <ul onClick={this.handleClick}>
            {
              this.props.games.finished.map( game => {
                return <li key={game.id} data-id={game.id}>
                  {game.nickname1}<span>vs.</span>{game.nickname2}
                  <br/>
                  { `Result: ${game.winner === this.props.user.id ? "Won" : "Lost"}` }
                </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
