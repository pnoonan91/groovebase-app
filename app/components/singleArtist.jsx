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

class SingleArtist extends Component {
  constructor(props) {
    super(props)
    this.artistCount = this.artistCount.bind(this)
    this.topAlbumsArr = this.topAlbumsArr.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
  }

  componentDidMount() {
    const {artistId} = this.props

    const currentArtist = artistSearch(artistId)
    store.dispatch(currentArtist)

    const artistTopAlbums = topAlbumSearch({artistMbid: artistId})
    store.dispatch(artistTopAlbums)
  }

  componentWillUnmount(){
    store.dispatch(setArtistTopAlbums({}))
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

  topAlbumsArr(){
    const {artistTopAlbums} = this.props
    if(artistTopAlbums.topalbums.album.length > 6){
      return artistTopAlbums.topalbums.album.slice(0,6)
    }
    else{
      return artistTopAlbums.topalbums.album
    }
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
    const { currentUser, userSetlists, userFavorites, artistId, currentArtist, userStats, artistTopAlbums } = this.props
    return (
      <div className="padding-container user-page">
        <div>
          <h1 className="purple-text header-text">{currentArtist.artistName && currentArtist.artistName}</h1>
          <p>You've seen <span className="purple-text bold">{currentArtist.artistName && currentArtist.artistName}</span> a total of <span className="purple-text bold">{userStats.rows && this.artistCount(userStats.rows)} times</span>. Check out details on the shows you've tracked below.</p>

          <div id="single-artist-content">
            <div>
            <div id="artist-details-container">
              <table id="set-width-table" className="table-results">
              {userSetlists.length && userSetlists.filter(obj => obj.artistMbid === artistId).map(setlist => (
                <tr className="table-listing" key={setlist.id}>
                <td className="table-listing-item user-page-listing">
                  <Link to={`/setlist/${setlist.setlistId}`}>
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
            <h4 className="purple-text header-text">Upcoming Tour Dates</h4>
              <table id="upcoming-tour-dates">
                <table>
                  <tr>
                    Testing
                  </tr>
                </table>
              </table>
            </div>
            <div>
            <h4 className="purple-text header-text onerem-padding-left">Top Albums from {currentArtist.artistName && currentArtist.artistName}</h4>
              <div id="single-artist-top-tracks">
                {artistTopAlbums.topalbums && this.topAlbumsArr().map(album => (
                  <a className="black-text" href={album.url} target="_blank">
                  <div className="top-album btm-margin">
                    <img className="no-margin" src={album.image[2]["#text"]} />
                    <h6 className="bold btm-margin">{album.name.length > 25 ? album.name.slice(0,25)+'...' : album.name}</h6>
                  </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser, userSetlists, userFavorites, currentArtist, userStats, artistTopAlbums }, ownProps) => {
  const artistId = ownProps.match.params.artistId
  return {
    currentUser,
    userSetlists,
    userFavorites,
    artistId,
    currentArtist,
    userStats,
    artistTopAlbums
  }
}

const mapDispatch = { }

export default connect(mapState, mapDispatch)(SingleArtist)
