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
import { setUserFavorites } from '../reducers/userFavorites.js'

class UserShows extends Component {
  constructor(props){
    super(props)
    this.playlistSearch = this.playlistSearch.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
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

  addFavorite(element){
    const {currentUser} = this.props
    const imgSrc = element.target.id
    axios.put(`/api/shows/favorite/${element.target.id}`)
    .then(() => {
      axios.get(`/api/shows/favorite/${currentUser.id}`)
      .then(res => res.data)
      .then(favorites => {
        store.dispatch(setUserFavorites(favorites))
      })
      .then(() => {
        let fav = document.getElementById(`${imgSrc}`).src.slice(-16)
        if(fav === 'not-favorite.png'){
          document.getElementById(`${imgSrc}`).src = "/favorite-icons/favorite.png"
        } else {
          document.getElementById(`${imgSrc}`).src = "/favorite-icons/not-favorite.png"
        }

      })
      .then(() => {
        axios.get(`/api/shows/${currentUser.id}`)
        .then(res => res.data)
        .then(setlists => {
          store.dispatch(setUserSetlists(setlists))
        })
      })
    })
  }

  render() {
    const { currentUser, userSetlists } = this.props
    return (
      <div className="padding-container user-page">
        <div id="user-header">
          <h1 className="header-text purple-text">{currentUser.firstName && currentUser.firstName}'s Setlist Archive</h1>
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
          <table className="table-results">
            <tr className="show-page-table-header">
              <th className="th-showpage">Artist</th>
              <th className="th-showpage">Date</th>
              <th className="th-showpage">Venue</th>
              <th>Favorite</th>
            </tr>
            {userSetlists.length && userSetlists.sort(function(a, b) {
              var nameA = a.artistName.toUpperCase()
              var nameB = b.artistName.toUpperCase()
              if(nameA < nameB){
                return -1
              }
              if(nameA > nameB){
                return 1
              }
              return 0
            }).map(setlist => (
              <tr className="table-listing" key={setlist.id}>
                <td className="table-listing-item user-page-listing">
                  <Link to={`/singleartist/${currentUser.id}/${setlist.artistMbid}`}>
                    <h3 className="purple-text no-margin underline-hover">{setlist.artistName}</h3>
                  </Link>
                </td>
                <td className="table-listing-item user-page-listing">
                  <Link className="black-text" to={`/setlist/${setlist.setlistId}`}>
                    <p className="no-margin">{setlist.eventDate}</p>
                  </Link>
                </td>
                <td className="table-listing-item user-page-listing">
                  <Link className="black-text" to={`/singlevenue/${currentUser.id}/${setlist.venueId}`}>
                    <p className="no-margin">{setlist.venueName}</p>
                    <p className="no-margin">{`${setlist.city}, ${setlist.stateCode}`}</p>
                  </Link>
                </td>
                <td className="table-listing" key={setlist.id}>
                  <img src={setlist.isFavorite} className="user-page-favorite-icon" id={setlist.id} onClick={this.addFavorite}/>
              </td>
              </tr>
            ))}
          </table>
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

export default connect(mapState, mapDispatch)(UserShows)
