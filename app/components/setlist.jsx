import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import { setlistSearch, setCurrentSetlist } from '../reducers/setlist.js'
import store from '../store.jsx'

class Setlist extends Component {
  constructor(props){
    super(props)
    this.setlistSongMap = this.setlistSongMap.bind(this)
  }
  componentDidMount() {
    const {setlistId} = this.props

    let setlist = {setlist: setlistId}

    const currentSetlist = setlistSearch(setlist)
    store.dispatch(currentSetlist)
  }

  componentWillUnmount() {
    store.dispatch(setCurrentSetlist({}))
  }

  setlistSongMap(setlistArr) {
    var returnArr = []
    for(var i = 0; i<setlistArr.length; i++){
      if(!setlistArr.length){
        return ['Setlist details not available :(']
      }
      for(var j = 0; j<setlistArr[i].song.length; j++){
          returnArr.push(setlistArr[i].song[j].name)
      }
    }

    if(!returnArr.length){
      return ['Setlist details not available :(']
    }
    return returnArr
  }

  render() {
    const {currentUser, setlist} = this.props

    return (
      <div className="padding-container sign-up-page">
        <h1 className="header-text purple-text">{setlist.artist && setlist.artist.name}</h1>
        <h4>{setlist.venue && setlist.venue.name + ' | ' + setlist.venue.city.name + ', ' + setlist.venue.city.stateCode + ' | ' + setlist.eventDate}</h4>
        <table className="table-results">
          <tr className="table-header-row">
            <th className="table-header-cell">Setlist</th>
          </tr>
          {setlist.sets && this.setlistSongMap(setlist.sets.set).map(song => (
            <tr className="table-listing" key={song}>
              <td className="table-listing-item">{song}</td>
            </tr>
          ))}
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
