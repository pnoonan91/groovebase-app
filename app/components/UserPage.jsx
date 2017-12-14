import React, { Component } from 'react'
import {render} from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import axios from 'axios'


class UserPage extends Component {
  constructor(props){
    super(props)
    this.playlistSearch = this.playlistSearch.bind(this)
  }

  playlistSearch(event) {
    event.preventDefault()
    // const headerConfig = {
    //   headers: {
    //     'Accept': 'application/json',
    //     'x-api-key': 'c5653fc6-cf2a-4988-a6d8-301648012d9c'
    //   }
    // }
    // const search = 'https://api.setlist.fm/rest/1.0/search/setlists?artistName='+event.target.artist.value+'&cityName='+event.target.city.value+'&stateCode='+event.target.state.value+'&venueName='+event.target.venue.value+'&date='+event.target.date.value+'&year='+event.target.year.value



    var options = { method: 'GET',
      url: 'https://api.setlist.fm/rest/1.0/search/setlists',
      qs:
       { artistName: 'Dave Matthews',
         cityName: '',
         stateCode: '',
         venueName: '',
         date: '',
         year: '2009' },
      headers:
       { 'postman-token': 'ac8b2829-aebb-92e4-0674-ea38e0c243b1',
         'cache-control': 'no-cache',
         'x-api-key': 'c5653fc6-cf2a-4988-a6d8-301648012d9c',
         accept: 'application/json' },
      body: '{\n\t"firstName": "Alex",\n\t"lastName": "Noonan",\n\t"email": "alex.noonan@gmail.com",\n\t"password": "mizzou123"\n}' };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

  }

  render() {
    const { user, currentUser } = this.props
    if(!user) return <div /> //the user id is invalid or data isn't loaded yet
    const authorized = currentUser && (currentUser.id === user.id)
    return (
      <div className="padding-container user-page">
        {/*User profile header*/}
        <div id="user-header">
          <h1 className="header-text purple-text">Welcome to grooveBase, {user && user.firstName}!</h1>
          <div id="playlist-search">
            <h3 className="purple-text playlist-search-btn">+Search for a Playlist</h3>
          </div>
        </div>

        {/*Playlist search form - originally hidden*/}
        <div id="playlist-search-container">
          <form id="playlist-search-form" onSubmit={this.playlistSearch}>
            <input className="signup-input" name="artist" placeholder="Artist or Group" />
            <input className="signup-input" name="city" placeholder="City" />
            <input className="signup-input" name="state" placeholder="State Code" />
            <input className="signup-input" name="venue" placeholder="Venue Name" />
            <input className="signup-input" name="date" placeholder="Date" />
            <input className="signup-input" name="year" placeholder="Year" />
            <button className="access-button">Search</button>
          </form>
        </div>
      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, currentUser }, ownProps) => {
  const paramId = Number(ownProps.match.params.userId)
  return {
    user: _.find(users, user => user.id === paramId),
    currentUser
  }
}

const mapDispatch = { }

export default connect(mapState, mapDispatch)(UserPage)
