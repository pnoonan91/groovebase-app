import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const GET_USER_STATS = 'GET_USER_STATS'
const SET_USER_STATS = 'SET_USER_STATS'

/* --------------    ACTION CREATORS    ----------------- */
export const setUserStats = stats => ({type: SET_USER_STATS, stats})

/* ------------------    REDUCER    --------------------- */
export default function reducer(userStats = {}, action) {
  switch (action.type){
    case SET_USER_STATS:
      return action.stats
    default:
      return userStats
  }
}
