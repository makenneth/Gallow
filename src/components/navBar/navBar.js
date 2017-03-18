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
          </li>
          <li className="menu-item">
            <a onClick={this.props.logOut}><i className="fa fa-sign-out" /></a>
          </li>
        </ul>
      </div>
    </div>);
  }
}
