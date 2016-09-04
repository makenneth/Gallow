import React from 'react'
import { Link } from "react-router"
import { logOut } from "../actions/userActions"
import { connect } from "react-redux"
const NavBar = (props) => {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>{ "Welcome, " + props.user }</li>
        <li><a onClick={props.logOut}>Log Out</a></li>
      </ul>
    </div>
    )
}



export default connect(null, { logOut})(NavBar)