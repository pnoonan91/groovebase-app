import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

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

    console.log('new user req.body: ', credentials)

    axios.post('/auth/me/signup', {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: credentials.email
    })
      .then(res => res.data)
      .then(user => {
        console.log('user created')
        document.getElementById('new-user-signup').reset()
      })
  }

  render() {
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
            <div id="email-input">
              <input className="signup-input full-width-input" name="email" placeholder="Email address" />
            </div>
            <div id="password-input">
              <input type="password" className="signup-input full-width-input" name="password" placeholder="New password" />
            </div>
            <div>
              <button id="create-account-btn">Create a Free Account!</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function submitHandler(event) {
  event.preventDefault()
}

export default SignUp;
