import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import {getSearch} from '../reducers/setlistSearch'
import store from '../store.jsx'
import { setUserSetlists } from '../reducers/userSetlists.js'
import { setlistSearchResultsPage } from '../reducers/setlistSearch'

class UserShows extends Component {
  constructor(props){
    super(props)
    this.playlistSearch = this.playlistSearch.bind(this)
  }

  componentDidMount(){
    const { currentUser } = this.props

    axios.get(`/api/shows/${currentUser.id}`)
    .then(res => res.data)
    .then(setlists => {
      store.dispatch(setUserSetlists(setlists))
    })
  }

  toggleView() {
    var node = document.getElementById("playlist-search-container")
    if (!node.style.display) {
      node.style.display = "block"
    }
    else if (node.style.display === "none") {
      node.style.display = "block"
    } else {
      node.style.display = "none"
    }
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

    this.props.searchSetlist(search)
  }

  render() {
    const { currentUser, userSetlists } = this.props
    return (
      <div className="padding-container user-page">
        <div id="user-header">
          <h1 className="header-text purple-text setlist-listing-header">{currentUser.firstName && currentUser.firstName}'s Setlist Archive</h1>
          <div id="playlist-search">
            <h3 className="purple-text playlist-search-btn no-margin" onClick={this.toggleView}>+Search for a Setlist</h3>
          </div>
        </div>

        {/*Playlist search form - originally hidden*/}
        <div id="playlist-search-container">
          <form id="playlist-search-form" onSubmit={this.playlistSearch}>
            <div id="playlist-search-inputs">
              <input className="signup-input" name="artist" placeholder="Artist or Group" />
              <input className="signup-input" name="year" placeholder="Year" />
              <input className="signup-input" name="city" placeholder="City" />
              <input className="signup-input" name="state" placeholder="State" />
            </div>
            <div>
              <button className="access-button">Search</button>
            </div>
          </form>
        </div>

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

const mapDispatch = {
  searchSetlist: setlistSearchResultsPage
}

export default connect(mapState, mapDispatch)(UserShows)
