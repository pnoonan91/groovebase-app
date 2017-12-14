import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { loginAndGoToUser } from '../reducers/auth'
import { connect } from 'react-redux'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.onLoginSubmit = this.onLoginSubmit.bind(this)
  }

  onLoginSubmit(event) {
    event.preventDefault()
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    this.props.login(credentials)
  }

  render() {
    const { message } = this.props
    return (
      <div className="padding-container sign-up-page">
        <h1 className="header-text purple-text">Log in to your account!</h1>
        <p>Welcome back to your personal live-music archive.</p>
        <form id="user-login" onSubmit={this.onLoginSubmit}>
          <div id="log-in-container">
            <div className="email-input">
              <input className="signup-input full-width-input" name="email" placeholder="Email address" />
            </div>
            <div className="password-input">
              <input type="password" className="signup-input full-width-input" name="password" placeholder="Password" />
            </div>
            <div>
              <button className="access-button">{message}</button>
            </div>
          </div>
        </form>
        <p>New to grooveBase? <Link className="component-link" to="/signup">Sign up here.</Link></p>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({message: 'Log In!'})

const mapDispatch = { login: loginAndGoToUser }

export default connect(mapState, mapDispatch)(LoginPage)
