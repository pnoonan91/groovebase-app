import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history.js'
import {logout as logOutUser} from '../reducers/auth.js'

function Navbar(props) {
  const {currentUser, logout} = props

  const loginNavBar = currentUser
  return (
    loginNavBar ?
    <div id="nav-bar">
      <div id="logo">
        <Link to={`/users/${currentUser.id}`}><h1>grooveBase</h1></Link>
      </div>
      <div id="nav-links">
        <h2 className="nav-link-a"></h2>
        <Link to={`/user/setlists/${currentUser.id}`}><h2 className="nav-link-a">Shows</h2></Link>
        <Link to={`/user/artists/${currentUser.id}`}><h2 className="nav-link-a">Artists</h2></Link>
        <Link to="#"><h2 className="nav-link-a">Venues</h2></Link>
        <Link to="/logout" onClick={props.logout}><h2 className="nav-link-a">Log Out</h2></Link>
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

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logOutUser())
  }
})

export default connect(mapState, mapDispatch)(Navbar)
