import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'


class UserPage extends Component {
  constructor(props){
    super(props)
    this.playlistSearch = this.playlistSearch.bind(this)
  }

  playlistSearch(event) {
    event.preventDefault()
    var searchResult

    axios.post('/api/search/setlist', {
      artistName: event.target.artist.value,
      year: event.target.year.value,
      cityName: event.target.city.value,
      stateCode: event.target.state.value
    })
    .then((res) => res.data)
    .then((setlist) => {
      searchResult = JSON.parse(setlist)
      console.log(console.log(searchResult))
    })
  }

  render() {
    const { user, currentUser } = this.props
    if(!user) return <div /> //the user id is invalid or data isn't loaded yet
    const authorized = currentUser && (currentUser.id === user.id)
    return (
      <div className="padding-container user-page">
        {/*User profile header*/}
        <div id="user-header">
          <h1 className="header-text purple-text">Welcome to grooveBase, {user && user.firstName}!</h1>
          <div id="playlist-search">
            <h3 className="purple-text playlist-search-btn">+Search for a Playlist</h3>
          </div>
        </div>

        {/*Playlist search form - originally hidden*/}
        <div id="playlist-search-container">
          <form id="playlist-search-form" onSubmit={this.playlistSearch}>
            <input className="signup-input" name="artist" placeholder="Artist or Group" />
            <input className="signup-input" name="year" placeholder="Year" />
            <input className="signup-input" name="city" placeholder="City" />
            <input className="signup-input" name="state" placeholder="State" />
            <button className="access-button">Search</button>
          </form>
        </div>
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
