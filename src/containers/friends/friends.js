import React,  { Component } from "react";
import { asyncConnect } from "redux-async-connect";
import { connect } from "react-redux";
import { isLoaded, loadFriends, unfriend } from "redux/modules/friends";
import { createGame } from "redux/modules/games";

@asyncConnect([{
  promise: ({ store }) => {
    let promise;
    if (!isLoaded(store.getState)) {
      promise = dispatch(loadFriends());
    }

    return promise;
  }
}])
@connect(({ friends }) => ({ friends }), { createGame })
class Friends extends Component {
  render() {
    const friends = this.props.friends.map((friend) => {
      return (<li>{ friend.nickname }
        <button onClick={() => this.props.createGame(friend)}>
          Play Now
        </button>
        <button onClick={() => this.props.unfriend(friend)}>
          Unfriend
        </button>
      </li>);
    });

    return (
      <div>
        <ul>
          { friends }
        </ul>
      </div>
    );
  }
}

export default Friends;
