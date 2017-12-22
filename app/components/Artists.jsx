import React, { Component } from 'react'
import {render} from 'react-dom'
import axios from 'axios'
import store from '../store.jsx'
import { connect } from 'react-redux'
import { setUserSetlists } from '../reducers/userSetlists.js'
import { Link } from 'react-router-dom'

class Artists extends Component {
  constructor(props){
    super(props)
    this.artistCountArr = this.artistCountArr.bind(this)
    this.displayArtistStats = this.displayArtistStats.bind(this)
    this.removeSpaces = this.removeSpaces.bind(this)
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

    for(var key in returnObj){
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

  render() {
    const { currentUser, userSetlists } = this.props
    return (
      <div className="padding-container user-page">
        <h1 className="purple-text header-text">Artists You've Tracked</h1>
          {userSetlists.length && this.artistCountArr(userSetlists).map(artist =>
            <table className="table-results-artist-page">
              <tr className="table-listing-artist-page" key={artist.artist} onClick={this.displayArtistStats}>
                <h3 id={`${this.removeSpaces(artist.artist)}`} className="purple-text artist-listing">{`${artist.artist} (${artist.seen})`}</h3>
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

const mapDispatch = { }

export default connect(mapState, mapDispatch)(Artists)
