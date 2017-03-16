import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'components';
import { logOut } from 'redux/modules/auth';
import { connectUser } from 'redux/modules/game';

@connect(
  ({ auth, error, loading }) => ({ user: auth.user, error, loading }),
  { logOut, connectUser }
)
export default class Main extends Component {
  componentDidMount() {
    this.props.connectUser();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) {
      window.location.replace('/');
    }
  }

  logOut = () => {
    this.setState({ loading: true });
    this.props.logOut();
  }

  loadingScreen() {
    return (this.props.loading &&
      <div className="overlay">
        <div className="loader" />
      </div>);
  }
  flashError() {
    return (this.props.error.message &&
      <div className="flash-error">
        { this.props.error.message }
      </div>);
  }
  children() {
    return (this.props.user &&
      React.Children.map(this.props.children, (child =>
        React.cloneElement(child, {
          user: this.props.user,
        })
      ))
    );
  }
  render() {
    return (
      <div className="root">
        <NavBar user={this.props.user} logOut={this.logOut} />
        { this.flashError() }
        <div className="app-container">
          { this.children() }
        </div>
        { this.loadingScreen() }
      </div>
    );
  }
}
