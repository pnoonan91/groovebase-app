import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import { setlistSearchResultsPage } from '../reducers/setlistSearch'
import { toggleView } from '../helperfuncs.js'
import userStats from '../reducers/userStats.js'
import store from '../store.jsx'
import {setUserStats} from '../reducers/userStats.js'

class UserPage extends Component {
  constructor(props){
    super(props)
    this.playlistSearch = this.playlistSearch.bind(this)
    this.artistCount = this.artistCount.bind(this)
    this.venueCount = this.venueCount.bind(this)
  }

  componentDidMount(){
    const {paramId} = this.props
    axios.get(`/api/search/stats/${paramId}`)
    .then(res => res.data)
    .then(setlists => {
      store.dispatch(setUserStats(setlists.userShows))
    })
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

  artistCount(artistArr){
    let count = 0
    let artists = []
    for(var i = 0; i<artistArr.length; i++){
      if(artists.indexOf(artistArr[i].artistName) === -1){
        artists.push(artistArr[i].artistName)
        count++
      }
    }
    return count
  }

  venueCount(venueArr){
    let count = 0
    let venues = []
    for(var i = 0; i<venueArr.length; i++){
      if(venues.indexOf(venueArr[i].venueName) === -1){
        venues.push(venueArr[i].venueName)
        count++
      }
    }
    return count
  }

  render() {
    const { user, currentUser, userStats } = this.props
    if(!user) return <div /> //the user id is invalid or data isn't loaded yet
    const authorized = currentUser && (currentUser.id === user.id)
    return (
      <div className="padding-container user-page">
        {/*User profile header*/}
        <div id="user-header">
          <h1 className="header-text purple-text no-margin">Welcome to grooveBase, {user && user.firstName}!</h1>
          <div id="playlist-search">
            <h3 className="purple-text playlist-search-btn no-margin" onClick={this.toggleView}>+Search for a Setlist</h3>
          </div>
        </div>
        <div id="user-info">
          <div className="user-info-container">
            <img className="user-info-icon" src="/profile-icons/idcard.png"/>{`${user.firstName} ${user.lastName}`}
          </div>
          <div className="user-info-container">
            <img className="user-info-icon" src="/profile-icons/location.png"/>  {`Chicago, IL`}
          </div>
          <div className="user-info-container">
            <img className="user-info-icon" src="/profile-icons/calendar.png"/>
           {"Joined: December 20, 2017"}
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
        <div id="user-landing-page">
          <div id='user-landing-left-pane'>
            <h4 className="header-text purple-text">Stats</h4>
            <p>You've seen <Link to={`/user/setlists/${currentUser.id && currentUser.id}`} className="purple-text underline-hover">{userStats.count} shows</Link> consisting of <Link to="#" className="purple-text underline-hover">{userStats.rows && this.artistCount(userStats.rows)} artists</Link> at <Link to="#" className="purple-text underline-hover">{userStats.rows && this.venueCount(userStats.rows)} venues</Link>.</p>
            <h4 className="header-text purple-text">Recent Shows</h4>
          </div>
          <div id="user-landing-right-pane">
            <h4 className="header-text purple-text">Favorite Shows</h4>
            <h4 className="header-text purple-text">Top Artists</h4>
            <h4 className="header-text purple-text">Top Venues</h4>
          </div>
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({users, currentUser, userStats}, ownProps) => {
  const paramId = Number(ownProps.match.params.userId)
  return {
    user: _.find(users, user => user.id === paramId),
    currentUser,
    userStats,
    paramId
  }
}

const mapDispatch = {
  searchSetlist: setlistSearchResultsPage
}

export default connect(mapState, mapDispatch)(UserPage)
