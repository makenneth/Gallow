import React, { Component } from 'react'
import { Link } from "react-router"
class NavBar extends Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((!this.props.user && nextProps.user) || 
        (this.props.user && this.props.user.Username !== nextProps.user.Username)){
      return true
    } 

    return false;
  }
  render(){
    if (!this.props.user){
      return (<div></div>)
    }
    return (
      <div className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>{ "Welcome, " + this.props.user.Username }</li>
          <li><a onClick={this.props.logOut}>Log Out</a></li>
        </ul>
      </div>
      )
  }
}



export default NavBar;