import {combineReducers} from 'redux'
import currentUser from './auth'
import users from './users'
import setlistSearch from './setlistSearch'
import setlist from './setlist'
import userSetlists from './userSetlists'

export default combineReducers({users, currentUser, setlistSearch, setlist, userSetlists})
