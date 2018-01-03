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

class SingleArtist extends Component {
  constructor(props) {
    super(props)
    this.artistCount = this.artistCount.bind(this)
  }

  componentDidMount() {
    const {artistId} = this.props

    const currentArtist = artistSearch(artistId)
    store.dispatch(currentArtist)
  }

  artistCount(artistArr){
    const {artistId} = this.props
    let count = 0
    let artists = []
    for(var i = 0; i<artistArr.length; i++){
      if(artistArr[i].artistMbid === artistId){
        count++
      }
    }
    return count
  }

  render() {
    const { currentUser, userSetlists, userFavorites, artistId, currentArtist, userStats } = this.props
    return (
      <div className="padding-container user-page">
        <div>
          <h1 className="purple-text header-text">{currentArtist.artistName && currentArtist.artistName}</h1>
          <p>You've seen <span className="purple-text bold">{currentArtist.artistName && currentArtist.artistName}</span> a total of <span className="purple-text bold">{userStats.rows && this.artistCount(userStats.rows)} times</span>. Check out details on the shows you've tracked below.</p>
          <div id="single-artist-content">
            <div id="artist-details-container">
              {userSetlists.length && userSetlists.filter(obj => obj.artistMbid === artistId).map(show => (
                <Link to={`/setlist/${show.setlistId}`} className="black-text">
                <div className="artist-details-item">
                  <h4 className="no-margin artist-detail-header">{show.venueName}</h4>
                  <h5 className="no-margin">{`${show.city}, ${show.stateCode}`}</h5>
                  <h5 className="no-margin">{show.eventDate}</h5>
                </div>
                </Link>
              ))}
            </div>
            <div id="single-artist-top-albums">
              top albums
            </div>
          </div>
        </div>
      </div>
    )
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser, userSetlists, userFavorites, currentArtist, userStats }, ownProps) => {
  const artistId = ownProps.match.params.artistId
  return {
    currentUser,
    userSetlists,
    userFavorites,
    artistId,
    currentArtist,
    userStats
  }
}

const mapDispatch = { }

export default connect(mapState, mapDispatch)(SingleArtist)
