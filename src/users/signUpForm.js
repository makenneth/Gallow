import React, { Component } from "react"
import { signUp } from "../actions/userActions"
import { connect } from "react-redux"
class SignUpForm extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleFieldUpdate = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state).then(() => {
      debugger;
      // this.context.router.push("/games")
    }).catch((err) => {

    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          onChange={this.handleFieldUpdate}
          value={this.state.username}
          />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={this.handleFieldUpdate}
          value={this.state.password}
          />
        <input type="submit" value="Sign Up"/>
      </form>
      )

  }
}
export default connect(null, { signUp })(SignUpForm);