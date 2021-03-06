import React, { Component } from 'react'
import {render} from 'react-dom'
import axios from 'axios'
import store from '../store.jsx'
import { connect } from 'react-redux'
import { setUserSetlists } from '../reducers/userSetlists.js'
import { Link } from 'react-router-dom'
import { setlistSearchResultsPage } from '../reducers/setlistSearch'
import { setUserFavorites } from '../reducers/userFavorites.js'

class Venues extends Component {
  constructor(props){
    super(props)
    this.venueCountArr = this.venueCountArr.bind(this)
    this.displayVenueShows = this.displayVenueShows.bind(this)
    this.removeSpaces = this.removeSpaces.bind(this)
    this.playlistSearch = this.playlistSearch.bind(this)
  }

  componentDidMount(){
    const { currentUser } = this.props

    axios.get(`/api/shows/${currentUser.id}`)
    .then(res => res.data)
    .then(setlists => {
      store.dispatch(setUserSetlists(setlists))
    })

    axios.get(`/api/shows/favorite/${currentUser.id}`)
    .then(res => res.data)
    .then(favorites => {
      store.dispatch(setUserFavorites(favorites))
    })
  }

  venueCountArr(setlistArr){
    let returnObj = {}

    for(var i = 0; i<setlistArr.length; i++){
      if(returnObj[setlistArr[i].venueName]){
        returnObj[setlistArr[i].venueName].count ++
      } else {
        returnObj[setlistArr[i].venueName] = {
          count: 1,
          venueId: setlistArr[i].venueId
        }
      }
    }

    let returnArr = []

    for (var key in returnObj){
      returnArr.push(
        {
          venue: key,
          seen: returnObj[key].count,
          venueId: returnObj[key].venueId
        }
      )
    }

    let newReturnArr = returnArr.sort(function(a, b) {
      var nameA = a.venue.toUpperCase()
      var nameB = b.venue.toUpperCase()
      if(nameA < nameB){
        return -1
      }
      if(nameA > nameB){
        return 1
      }
      return 0
    })

    return newReturnArr
  }

  artistCountArr(setlistArr){
    let returnObj = {}

    for(var i = 0; i<setlistArr.length; i++){
      if(returnObj[setlistArr[i].artistName]){
        returnObj[setlistArr[i].artistName] = returnObj[setlistArr[i].artistName] + 1
      } else {
        returnObj[setlistArr[i].artistName] = 1
      }
    }

    let returnArr = []

    for(var key in returnObj){
      returnArr.push(
        {
          artist: key,
          seen: returnObj[key]
        }
      )
    }

    returnArr = returnArr.sort(function(a, b){
      return b.seen - a.seen
    })

    if(returnArr.length > 5){
      return returnArr.slice(0, 6)
    }

    return returnArr
  }

  topVenueCountArr(setlistArr){
    let returnObj = {}

        for(var i = 0; i<setlistArr.length; i++){
          if(returnObj[setlistArr[i].venueName]){
            returnObj[setlistArr[i].venueName] = returnObj[setlistArr[i].venueName] + 1
          } else {
            returnObj[setlistArr[i].venueName] = 1
          }
        }

        let returnArr = []

        for (var key in returnObj){
          returnArr.push(
            {
              venue: key,
              seen: returnObj[key]
            }
          )
        }

        returnArr = returnArr.sort(function(a, b){
          return b.seen - a.seen
        })

        if(returnArr.length > 5){
          return returnArr.slice(0, 6)
        }

        return returnArr
  }

  displayVenueShows(element){

    let showStats = element.target.id + '-details'
    let displayEl = document.getElementById(showStats)

    if (!displayEl.style.display){
      displayEl.style.display = "block"
    } else if(displayEl.style.display === "none") {
      displayEl.style.display = "block"
    } else {
      displayEl.style.display = "none"
    }
  }

  removeSpaces(str){
    let returnStr = str.replace(/\s+/g, '')
    return returnStr
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

  topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
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
    const { currentUser, userSetlists, userFavorites } = this.props
    return (
      <div className="padding-container user-page">
        <div id="user-header">
          <h1 className="purple-text header-text">Venues You've Visited</h1>
          <div id="playlist-search">
            <h3 className="purple-text playlist-search-btn no-margin" onClick={this.toggleView}>+Search for a Setlist</h3>
          </div>
        </div>

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
          <div id="user-landing-left-pane">
          {userSetlists.length && this.venueCountArr(userSetlists).map(venue =>
            <table className="table-results-artist-page all-artist-table">
              <tr className="table-listing-artist-page" key={venue.venue} onClick={this.displayVenueShows}>
                <Link to={`/singlevenue/${currentUser.id}/${venue.venueId}`}>
                  <h3 id={`${this.removeSpaces(venue.venue)}`} className="purple-text artist-listing no-margin">{`${venue.venue} (${venue.seen})`}</h3>
                </Link>
              </tr>
              <tr id={`${this.removeSpaces(venue.venue)}-details`} className="hide-artist-details artist-details">
              <div id="artist-details-container">
                {userSetlists.filter(obj => obj.venueName === venue.venue).map(show => (
                  <Link to={`/setlist/${show.setlistId}`} className="black-text">
                  <div className="artist-details-item">
                    <h4 className="no-margin artist-detail-header">{show.artistName}</h4>
                    <h5 className="no-margin">{`${show.city}, ${show.stateCode}`}</h5>
                    <h5 className="no-margin">{show.eventDate}</h5>
                  </div>
                  </Link>
                ))}
              </div>
            </tr>
            </table>
          )}
          <table className="table-results-artist-page all-artist-table">
          <tr className="table-listing-final-row purple-text" onClick={this.topFunction}>
          Back to Top <img className="smaller-icon" src="/images/top.png" />
          </tr>
        </table>
          </div>
          <div id="user-landing-right-pane">
          <h4 className="header-text purple-text">Favorite Shows</h4>
            <ul>
              {userFavorites.length && userFavorites.map(favorite => (
                <li className="top-artist-li"><Link to={`/setlist/${favorite.setlistId}`} className="top-artist-link">{`${favorite.artistName} (${favorite.eventDate})`}</Link></li>
              ))}
            </ul>
          <h4 className="header-text purple-text">Top Artists</h4>
            <ul>
              {userSetlists.length && this.artistCountArr(userSetlists).map(result => (
                <li className="top-artist-li"><Link to="#" className="top-artist-link">{result.artist} ({result.seen})</Link></li>
              ))}
            </ul>
          <h4 className="header-text purple-text">Top Venues</h4>
              <ul>
              {userSetlists.length && this.topVenueCountArr(userSetlists).map(result => (
                <li className="top-artist-li">
                  <Link to="#" className="top-artist-link">
                    {result.venue} ({result.seen})
                  </Link>
                </li>
              ))}
              </ul>
        </div>
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser, userSetlists, userFavorites }, ownProps) => {
  return {
    currentUser,
    userSetlists,
    userFavorites
  }
}

const mapDispatch = {
  searchSetlist: setlistSearchResultsPage
 }

export default connect(mapState, mapDispatch)(Venues)
