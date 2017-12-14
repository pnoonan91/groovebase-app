import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <div id="nav-bar">
      <div id="logo">
        <Link to="/"><h1>grooveBase</h1></Link>
      </div>
      <div id="nav-links">
        <h2 className="nav-link-a"></h2>
        <Link to="/signup"><h2 className="nav-link-a">Sign Up</h2></Link>
        <Link to="/login"><h2 className="nav-link-a">Log In</h2></Link>
      </div>
    </div>
  )
}

export default Navbar;
