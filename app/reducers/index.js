import {combineReducers} from 'redux'
import currentUser from './auth'
import users from './users'

export default combineReducers({users, currentUser})
