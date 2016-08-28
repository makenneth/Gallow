import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { setUser } from "../actions/actions"
class GetUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }
  }
  _handleChange = (e) => {
    this.setState({username: e.target.value})
  } 
  _handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username === ""){
      this.props.setUser("Anonymous");
    } else {
      this.props.setUser(this.state.username);
    }
  }
  render(){
    return (
      <div className="overlay">
        <form onSubmit={this._handleSubmit} className="user-name">
          <h3>Please enter your username</h3>
          <input type="text" 
                 onChange={this._handleChange} 
                 value={this.state.username} 
                 placeholder="Enter your username"/>
          <input type="submit" value="Submit" />
        </form>
      </div>
      )
  }
}

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({ setUser }, dispatch) 
}


export default connect(null, mapActionsToProps)(GetUsername)