import React, { Component } from "react";
import { Link } from "react-router";

export default class NavBar extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if ((!this.props.user && nextProps.user) ||
        (this.props.user && this.props.user.username !== nextProps.user.username)){
      return true;
    }

    return false;
  }
  render() {
    if (!this.props.user){
      return (<div></div>);
    }
    return (<div className="navbar-container">
      <div className="navbar">
        <div className="logo"><Link to="/">Hangperson</Link></div>
        <ul>
          <li><Link to="/games/new">New Game</Link></li>
          <li><a onClick={this.props.logOut}>Log Out</a></li>
        </ul>
      </div>
    </div>);
  }
};