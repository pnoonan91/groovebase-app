import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'

function Footer(props) {
  return(
    <div className="footer">
      <div id="footer-container">
        <div id="footer-nav">
          <h1 className="footer-logo">grooveBase</h1>
          <p>
            <Link to="/">HOME</Link> | <Link to="mailto:pnoonan91@gmail.com">CONTACT</Link> | <Link to="/signup">SIGN UP</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
