import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Navbar(props) {
  const {currentUser} = props

  const loginNavBar = currentUser
  return (
    loginNavBar ?
    <div id="nav-bar">
      <div id="logo">
        <Link to={`/users/${currentUser.id}`}><h1>grooveBase</h1></Link>
      </div>
      <div id="nav-links">
        <h2 className="nav-link-a"></h2>
        <Link to="#"><h2 className="nav-link-a">Shows</h2></Link>
        <Link to="#"><h2 className="nav-link-a">Songs</h2></Link>
        <Link to="#"><h2 className="nav-link-a">Venues</h2></Link>
      </div>
    </div>
  :
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

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser }, ownProps) => {
  return {
    currentUser: currentUser
  }
}

export default connect(mapState)(Navbar)
