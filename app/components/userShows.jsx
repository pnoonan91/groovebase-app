import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'
import {getSearch} from '../reducers/setlistSearch'
import store from '../store.jsx'
import { setUserSetlists } from '../reducers/userSetlists.js'

class UserShows extends Component {
  constructor(props){
    super(props)
    this.getArtistName = this.getArtistName.bind(this)
  }

  componentDidMount(){
    const { currentUser } = this.props

    axios.get(`/api/shows/${currentUser.id}`)
    .then(res => res.data)
    .then(setlists => {
      store.dispatch(setUserSetlists(setlists))
    })
  }

  getArtistName(artistMbid) {

   axios.post('/api/search/artistname', {artistMbid})
    .then(result => JSON.parse(result.data))

  }

  render() {
    const { currentUser, userSetlists } = this.props
    return (
      <div className="padding-container user-page">
        <h1 className="header-text purple-text">{currentUser.firstName}'s Setlist Archive</h1>
        {userSetlists.length && userSetlists.map(setlist => <h4>{this.getArtistName(setlist.artistMbid)}</h4>)}
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

export default connect(mapState, mapDispatch)(UserShows)
