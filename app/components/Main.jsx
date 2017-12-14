import React, { Component } from 'react'
import {render} from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Welcome from './Welcome.jsx'
import SignUp from './SignUp.jsx'
import LoginPage from './Login.jsx'
import Footer from './Footer.jsx'

export default class Main extends Component {
  render() {
    return (
      <Router>
        <div id="main">
          <div id="nav-bar-container">
            <Navbar />
          </div>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
            <Footer />
        </div>
      </Router>
    )
  }
}
