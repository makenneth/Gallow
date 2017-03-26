import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.scss';

export default class NavBar extends Component {
  shouldComponentUpdate(nextProps) {
    if ((!this.props.user && nextProps.user) ||
        (this.props.user && nextProps.user && this.props.user.username !== nextProps.user.username)) {
      return true;
    }

    return false;
  }

  tooltip(text) {
    return (<div className="tooltip bottom">
      {text}
    </div>)
  }

  render() {
    if (!this.props.user) {
      return (<div />);
    }
    return (<div className="navbar-container">
      <div className="navbar">
        <div className="logo"><Link to="/">Hangperson</Link></div>
        <ul>
          <li className="menu-item">
            <Link to="/games/new"><i className="fa fa-plus" /></Link>
            {this.tooltip('New game')}
          </li>
          <li className="menu-item">
            <a onClick={this.props.logOut}><i className="fa fa-sign-out" /></a>
            {this.tooltip('Log Out')}
          </li>
        </ul>
      </div>
    </div>);
  }
}
