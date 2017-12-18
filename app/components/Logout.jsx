import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../history.js'


export default function Navbar(props) {
  return (
    <div className="padding-container user-page">
      <h1 className="header-text purple-text">Thanks for groovin' with us!</h1>
    </div>
  )
}
