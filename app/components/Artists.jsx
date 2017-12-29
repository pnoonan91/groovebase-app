import React, { Component } from 'react'
import {render} from 'react-dom'
import axios from 'axios'
import store from '../store.jsx'
import { connect } from 'react-redux'
import { setUserSetlists } from '../reducers/userSetlists.js'
import { Link } from 'react-router-dom'
import { setlistSearchResultsPage } from '../reducers/setlistSearch'

class Artists extends Component {
  constructor(props){
    super(props)
    this.artistCountArr = this.artistCountArr.bind(this)
    this.displayArtistStats = this.displayArtistStats.bind(this)
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

    for (var key in returnObj){
      returnArr.push(
        {
          artist: key,
          seen: returnObj[key]
        }
      )
    }
    console.log(returnArr)
    return returnArr
  }

  displayArtistStats(element){

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
          <h1 className="purple-text header-text">Artists You've Tracked</h1>
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

          {userSetlists.length && this.artistCountArr(userSetlists).map(artist =>
            <table className="table-results-artist-page all-artist-table">
              <tr className="table-listing-artist-page" key={artist.artist} onClick={this.displayArtistStats}>
                <h3 id={`${this.removeSpaces(artist.artist)}`} className="purple-text artist-listing no-margin">{`${artist.artist} (${artist.seen})`}</h3>
              </tr>
              <tr id={`${this.removeSpaces(artist.artist)}-details`} className="hide-artist-details artist-details">
                <div id="artist-details-container">
                  {userSetlists.filter(obj => obj.artistName === artist.artist).map(show => (
                    <Link to={`/setlist/${show.setlistId}`} className="black-text">
                    <div className="artist-details-item">
                      <h4 className="no-margin artist-detail-header">{show.venueName}</h4>
                      <h5 className="no-margin">{`${show.city}, ${show.stateCode}`}</h5>
                      <h5 className="no-margin">{show.eventDate}</h5>
                    </div>
                    </Link>
                  ))}
                </div>
              </tr>
            </table>
          )}
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

export default connect(mapState, mapDispatch)(Artists)
