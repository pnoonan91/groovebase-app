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
    console.log('button clicked!')
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
              <td className="table-listing-item">{show.eventDate}</td>
              <td className="table-listing-item">{show.artist.name}</td>
              <td className="table-listing-item">{show.venue.name}</td>
              <td className="table-listing-item">{`${show.venue.city.name}, ${show.venue.city.stateCode}`}</td>
              <td className="table-listing-item-center"><button className="access-button">+</button></td>
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
