import React from 'react'
import { Link } from "react-router"

const NavBar = (props) => {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </div>
    )
}



export default NavBar