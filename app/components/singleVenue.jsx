import React, { Component } from 'react'
import {render} from 'react-dom'
import axios from 'axios'
import store from '../store.jsx'
import { connect } from 'react-redux'
import { setUserSetlists } from '../reducers/userSetlists.js'
import { Link } from 'react-router-dom'
import { setlistSearchResultsPage } from '../reducers/setlistSearch'
import { setUserFavorites } from '../reducers/userFavorites.js'
import {artistSearch} from '../reducers/singleArtist.js'
import {topAlbumSearch, setArtistTopAlbums} from '../reducers/artistTopAlbums.js'
import {venueSearch} from '../reducers/singleVenue.js'

class SingleVenue extends Component {
  constructor(props) {
    super(props)

    this.showCount = this.showCount.bind(this)
  }

  componentDidMount(){
    const {venueId} = this.props

    const currentVenue = venueSearch(venueId)
    store.dispatch(currentVenue)
  }

  showCount(showArr){
    const {venueId} = this.props
    let count = 0
    let venues = []
    for(var i = 0; i<showArr.length; i++){
      if(showArr[i].venueId === venueId){
        count++
      }
    }
    return count
  }

  render() {
    const { currentUser, userSetlists, userFavorites, artistId, currentArtist, userStats, artistTopAlbums, currentVenue, venueId } = this.props
    return (
      <div className="padding-container user-page">
        <h1 className="purple-text header-text">{currentVenue.venueName && currentVenue.venueName}</h1>
        <h3 className="no-margin">{currentVenue.venueName && `${currentVenue.city}, ${currentVenue.stateCode}`}</h3>
        <p>You've seen a total of <span className="purple-text bold">{userStats.rows && this.showCount(userStats.rows)} shows</span> at <span className="purple-text bold">{currentVenue.venueName && currentVenue.venueName}</span>.</p>

        <div id="single-artist-content">
          <div>
          <div id="artist-details-container">
            <table id="set-width-table" className="table-results">
            {userSetlists.length && userSetlists.filter(obj => obj.venueId === venueId).map(setlist => (
              <tr className="table-listing" key={setlist.id}>
              <td className="table-listing-item user-page-listing">
                <Link to={`/singleartist/${currentUser.id}/${setlist.artistMbid}`}>
                  <h3 className="purple-text no-margin underline-hover">{setlist.artistName}</h3>
                </Link>
              </td>
              <td className="table-listing-item user-page-listing">
                <p className="no-margin">{setlist.eventDate}</p>
              </td>
              <td className="table-listing-item user-page-listing">
                <p className="no-margin">{setlist.venueName}</p>
                <p className="no-margin">{`${setlist.city}, ${setlist.stateCode}`}</p>
              </td>
              <td className="table-listing" key={setlist.id}>
                <img src={setlist.isFavorite} className="user-page-favorite-icon" id={setlist.id} onClick={this.addFavorite}/>
            </td>
            </tr>
            ))}
            </table>
          </div>
          </div>
          <div>
          </div>
        </div>

      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser, userSetlists, userFavorites, currentArtist, userStats, currentVenue }, ownProps) => {
  const venueId = ownProps.match.params.venueId
  return {
    currentUser,
    userSetlists,
    userFavorites,
    currentArtist,
    userStats,
    venueId,
    currentVenue
  }
}

const mapDispatch = { }

export default connect(mapState, mapDispatch)(SingleVenue)
