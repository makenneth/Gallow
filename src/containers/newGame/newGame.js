import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createGame } from 'redux/modules/games';
import { fetchUsers } from 'redux/modules/users_query';
import './styles.css';

@connect(
  ({ usersQuery }) => ({ usersQuery }),
  { fetchUsers, createGame }
)
export default class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      selectedOpponent: null,
      selected: false,
    };
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
    });
  }
  handleSelect = (e) => {
    const user = JSON.parse(e.target.dataset.user);
    this.setState({
      name: user.nickname,
      selectedOpponent: user,
      selected: true,
    });
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
      style={{
        display: this.props.usersQuery.length && !this.state.selected ? 'block' : 'none',
      }}
    >
      {
        function mapFoundUsers() {
          const users = [];
          const usersQuery = this.props.usersQuery;
          for (let i = 0; i < usersQuery.length; i++) {
            const user = usersQuery[i];
            if (user.id !== 1 && user.id !== this.props.user.id) {
              users.push(<li data-user={JSON.stringify(user)} key={user.id}>{ user.nickname }</li>);
            }
          }
          return users;
        }.call(this)
      }
    </ul>);
  }
  render() {
    return (<div className="new-game-container">
      <h1>New Game</h1>
      <div>
        <div className="user-input">
          <input
            type="text"
            placeholder="Enter the user name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <div onClick={this.handleClear}>&times;</div>
        </div>
        { this.listFoundUsers() }
      </div>

      <input
        type="submit"
        value="Start Game"
        onClick={this.startGame}
        disabled={!this.state.selectedOpponent}
      />
    </div>
    );
  }
}
