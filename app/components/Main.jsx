import React, { Component } from 'react'
import {render} from 'react-dom'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Welcome from './Welcome.jsx'
import SignUp from './SignUp.jsx'
import LoginPage from './Login.jsx'
import UserPage from './UserPage.jsx'
import Footer from './Footer.jsx'
import history from '../history.js'
import {fetchUsers} from '../reducers/users.js'
import store from '../store.jsx'
import { retrieveLoggedInUser } from '../reducers/auth'
import Logout from './Logout.jsx'
import SetlistSearch from './SetlistSearch.jsx'
import {getSearch} from '../reducers/setlistSearch.js'
import Setlist from './setlist.jsx'
import UserShows from './userShows.jsx'
import Artists from './Artists.jsx'
import Venues from './Venues.jsx'
import SingleArtist from './singleArtist.jsx'
import SingleVenue from './singleVenue.jsx'

export default class Main extends Component {
  componentDidMount() {
    const usersThunk = fetchUsers()
    const activeUser = retrieveLoggedInUser()
    const currentSearch = getSearch()
    store.dispatch(usersThunk)
    store.dispatch(activeUser)
    store.dispatch(currentSearch)
  }

  render() {
    return (
      <Router history={history}>
        <div id="main">
          <div id="nav-bar-container">
            <Navbar />
          </div>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/users/:userId" component={UserPage} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/search/setlist" component={SetlistSearch} />
              <Route exact path="/setlist/:setlistId" component={Setlist} />
              <Route exact path="/user/setlists/:userId" component={UserShows} />
              <Route exact path="/user/artists/:userId" component={Artists} />
              <Route exact path="/user/venues/:userId" component={Venues} />
              <Route exact path="/singleartist/:userId/:artistId" component={SingleArtist} />
              <Route exact path="/singlevenue/:userId/:venueId" component={SingleVenue} />
            </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}
