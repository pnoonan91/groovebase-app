import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import { setlistSearchResultsPage } from '../reducers/setlistSearch'


class UserPage extends Component {
  constructor(props){
    super(props)
    this.playlistSearch = this.playlistSearch.bind(this)
  }

  playlistSearch(event) {
    event.preventDefault()

    let search = {}
    let artistName = event.target.artist.value
    let year = event.target.year.value
    let cityName = event.target.city.value
    let stateCode = event.target.state.value

    if(artistName !== '') search.artistName = artistName
    if(year !== '') search.year = year
    if(cityName !== '') search.cityName = cityName
    if(stateCode !== '') search.stateCode = stateCode

    console.log('search object: ', search)
    this.props.searchSetlist(search)
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

const mapDispatch = { searchSetlist: setlistSearchResultsPage }

export default connect(mapState, mapDispatch)(UserPage)
