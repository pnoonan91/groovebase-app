import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import { setlistSearch } from '../reducers/setlist.js'
import store from '../store.jsx'

class Setlist extends Component {
  componentDidMount() {
    const {setlistId} = this.props

    let setlist = {setlist: setlistId}

    const currentSetlist = setlistSearch(setlist)
    store.dispatch(currentSetlist)
  }

  render() {
    const {currentUser, setlist} = this.props

    return (
      <div className="page-content">
        <h1 className="header-text purple-text">{setlist.artist && setlist.artist.name}</h1>
        <h4>{setlist.venue && setlist.venue.name + ' | ' + setlist.venue.city.name + ', ' + setlist.venue.city.stateCode + ' | ' + setlist.eventDate}</h4>
        <table>
          <tr className="table-header-row">
            <th className="table-header-cell">Setlist</th>
          </tr>
        </table>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */
const mapState = ({currentUser, setlist}, ownProps) => {
  const setlistId = ownProps.match.params.setlistId
  return {
    currentUser,
    setlist,
    setlistId
  }
}

export default connect(mapState)(Setlist)
