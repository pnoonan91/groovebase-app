import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import {getSearch} from '../reducers/setlistSearch'
import store from '../store.jsx'

class SetlistSearch extends Component {
  constructor(props) {
    super(props)
    this.saveSetlist = this.saveSetlist.bind(this)
  }

  saveSetlist(event) {
    event.preventDefault()

    let nodeString = event.target.id
    let saveShow = JSON.parse(event.target.id)

    axios.post('/api/shows/save', saveShow)
    .then(res => res.data)
    .then(setlist => {
      if (setlist[1] === false) {
        document.getElementById(nodeString).innerText="Already Exists"
      } else {
        document.getElementById(nodeString).innerText="Saved!"
      }
    })

  }

  render() {
    const { setlistSearch, currentUser } = this.props
    if(!currentUser) return <h3 className="header-text purple-text">Please log in to search for setlists.</h3>//the user id is invalid or data isn't loaded yet

    let results = setlistSearch.setlist

    return (
      <div className="padding-container user-page">
        <h3 className="header-text purple-text">Setlist Search Results</h3>
        <table className="table-results">
          <tr className="table-header-row">
            <th className="table-header-cell">Date</th>
            <th className="table-header-cell">Artist</th>
            <th className="table-header-cell">Venue</th>
            <th className="table-header-cell">Location</th>
            <th className="table-header-cell">Add to Setlists</th>
          </tr>
          {results && results.map(show => (
            <tr className="table-listing" key={show.id}>
              <td className="table-listing-item"><Link className="purple-text" to={`/setlist/${show.id}`}>{show.eventDate}</Link></td>
              <td className="table-listing-item">{show.artist.name}</td>
              <td className="table-listing-item">{show.venue.name}</td>
              <td className="table-listing-item">{`${show.venue.city.name}, ${show.venue.city.stateCode}`}</td>
              <td className="table-listing-item-center"><button className="access-button" id={`{"setlistId": "${show.id}", "Mbid": "${show.artist.mbid}", "artistName": "${show.artist.name}", "venueId": "${show.venue.id}", "venueName": "${show.venue.name}", "city": "${show.venue.city.name}", "stateCode": "${show.venue.city.stateCode}", "eventDate": "${show.eventDate}"
              , "UserId": "${currentUser.id}"}`} onClick={this.saveSetlist}>+</button></td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ setlistSearch, currentUser }, ownProps) => {
  return {
    setlistSearch,
    currentUser
  }
}

const mapDispatch = { }

export default connect(mapState, mapDispatch)(SetlistSearch)
