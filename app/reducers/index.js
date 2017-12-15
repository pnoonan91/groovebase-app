import {combineReducers} from 'redux'
import currentUser from './auth'
import users from './users'
import setlistSearch from './setlistSearch'

export default combineReducers({users, currentUser, setlistSearch})
