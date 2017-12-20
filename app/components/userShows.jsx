import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import {getSearch} from '../reducers/setlistSearch'
import store from '../store.jsx'
import { setUserSetlists } from '../reducers/userSetlists.js'

class UserShows extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { currentUser } = this.props

    axios.get(`/api/shows/${currentUser.id}`)
    .then(res => res.data)
    .then(setlists => {
      store.dispatch(setUserSetlists(setlists))
    })
  }

  render() {
    const { currentUser, userSetlists } = this.props
    return (
      <div className="padding-container user-page">
        <h1 className="header-text purple-text setlist-listing-header">{currentUser.firstName && currentUser.firstName}'s Setlist Archive</h1>
        <div id="user-setlist-listing">
          {userSetlists.length && userSetlists.map(setlist =>
            <div className="setlist-item">
              <Link to={`/setlist/${setlist.setlistId}`}>
              <div className="setlist-thumbnail">{setlist.artistName}</div>
              </Link>
              <div className="setlist-caption">
                <span className="caption-header">{setlist.venueName}</span>
                <p className="caption-location">{`${setlist.city}, ${setlist.stateCode}`}</p>
                <p className="event-date">{setlist.eventDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser, userSetlists }, ownProps) => {
  return {
    currentUser,
    userSetlists
  }
}

const mapDispatch = { }

export default connect(mapState, mapDispatch)(UserShows)
