import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { signupAndGoToUser } from '../reducers/auth'
import { connect } from 'react-redux'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
  }

  onSignupSubmit(event) {
    event.preventDefault()
    const credentials = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value
    }

    this.props.signup(credentials)
  }

  render() {
    const { message } = this.props
    return (
      <div className="padding-container sign-up-page">
        <h1 className="header-text purple-text">Create a new account!</h1>
        <p>Start tracking your live music experiences and re-living the magic.</p>
        <form id="new-user-signup" onSubmit={this.onSignupSubmit}>
          <div id="sign-up-container">
            <div id="name-inputs">
              <input className="signup-input name-input" name="firstName" placeholder="First name" />
              <input className="signup-input name-input" name="lastName" placeholder="Last name" />
            </div>
            <div className="email-input">
              <input className="signup-input full-width-input" name="email" placeholder="Email address" />
            </div>
            <div className="password-input">
              <input type="password" className="signup-input full-width-input" name="password" placeholder="New password" />
            </div>
            <div>
              <button className="access-button">{message}</button>
            </div>
          </div>
        </form>
        <p>Already have an account? <Link className="component-link" to="/login">Log-in here.</Link></p>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({message: 'Create a Free Account!'})

const mapDispatch = { signup: signupAndGoToUser }

export default connect(mapState, mapDispatch)(SignUp)
