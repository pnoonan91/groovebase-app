import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history.js'


export default function Navbar(props) {
  return (
    <div className="padding-container">
      <h2 className="header-text purple-text">Bitch, you logged out!</h2>
    </div>
  )
}
