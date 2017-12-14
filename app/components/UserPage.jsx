import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

class UserPage extends Component {
  render() {
    const { user, currentUser } = this.props
    console.log('user: ', user)
    if(!user) return <div /> //the user id is invalid or data isn't loaded yet
    const authorized = currentUser && (currentUser.id === user.id)
    return (
      <div className="padding-container user-page">
        <h1 className="header-text">Welcome to grooveBase, {user && user.firstName}!</h1>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, currentUser }, ownProps) => {
  const paramId = Number(ownProps.match.params.userId)
  return {
    user: _.find(users, user => user.id === paramId),
    currentUser
  }
}

const mapDispatch = { }

export default connect(mapState, mapDispatch)(UserPage)
