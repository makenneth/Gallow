import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createGame } from 'redux/modules/games';
import { fetchUsers, getUserSuggestions, clearUserQuery } from 'redux/modules/users_query';
import './styles.scss';

@connect(
  ({ userQuery, auth: { user }, userSuggestions: { suggestions, isLoading } }) =>
  ({ userQuery, suggestions, isLoading, user }),
  { fetchUsers, createGame, getUserSuggestions, clearUserQuery }
)
export default class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dropdownOpen: false,
      selectedOpponent: null,
      selected: false,
    };
  }

  componentDidMount() {
    this.props.getUserSuggestions();
    document.addEventListener('click', this.handleClick);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.userQuery, nextProps.userQuery);
    if (this.props.userQuery !== nextProps.userQuery &&
      nextProps.userQuery.length > 0 && !this.state.dropdownOpen) {
      this.setState({ dropdownOpen: true });
    }
  }

  handleclick = (ev) => {
    debugger;
  }

  startGame = () => {
    if (!this.state.selectedOpponent) {
      alert('You have to select a player first!');
    } else {
      this.props.createGame(this.state.selectedOpponent)
        .then((res) => {
          browserHistory.push(`/games/${res.data.id}`);
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  handleClear = () => {
    this.setState({
      name: '',
      selectedOpponent: null,
      dropdownOpen: false,
    });
    this.props.clearUserQuery();
  }

  handleSelect = (e) => {
    const user = JSON.parse(e.target.dataset.user);
    this.setState({
      name: user.nickname,
      selectedOpponent: user,
      selected: true,
      dropdownOpen: false,
    });
  }

  handleSelectSuggestion = (user) => {
    this.setState({
      name: user.nickname,
      selectedOpponent: user,
    }, this.startGame);
  }

  handleChange = (e) => {
    let timer;
    this.setState({
      name: e.target.value,
      selected: false,
    });

    clearTimeout(timer);
    timer = setTimeout(() => {
      this.props.fetchUsers(this.state.name);
    }, 700);
  }

  listFoundUsers() {
    return (<ul
      onClick={this.handleSelect}
      className={!this.state.dropdownOpen && 'not-show'}
    >
      {
        function mapFoundUsers() {
          const users = [];
          const userQuery = this.props.userQuery;
          for (let i = 0; i < userQuery.length; i++) {
            const user = userQuery[i];
            if (user.id !== 1 && user.id !== this.props.user.id) {
              users.push(<li data-user={JSON.stringify(user)} key={user.id}>{user.nickname}</li>);
            }
          }
          return users;
        }.call(this)
      }
    </ul>);
  }

  render() {
    const { isLoading, suggestions, user } = this.props;
    return (<div className="new-game-container" ref="new-game-container">
      <h3>Suggestions</h3>
      <div className="user-suggestions">
        {
          suggestions.filter(s => !user || s.username !== user.username).map((suggestion, i) => {
            return (<div key={i}>
              <div className="name">{suggestion.nickname}</div>
              <div className="stats"><span>Wins: </span>{suggestion.wins}</div>
              <div className="stats"><span>Losses: </span>{suggestion.losses}</div>

              <button onClick={() => this.handleSelectSuggestion(suggestion)}>
                Start Game
              </button>
            </div>);
          })
        }
        {
          isLoading && <div className="overlay">
            <div className="loader" />
          </div>
        }
      </div>
      <h1>New Game</h1>
      <div className="user-input-container">
        <div className="user-input">
          <input
            type="text"
            placeholder="Enter the user name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <div onClick={this.handleClear}>&times;</div>
        </div>
        {this.listFoundUsers()}
      </div>

      <input
        type="submit"
        value="Start Game"
        onClick={this.startGame}
        disabled={!this.state.selectedOpponent}
      />
    </div>);
  }
}
