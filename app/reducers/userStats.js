import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const GET_USER_STATS = 'GET_USER_STATS'
const SET_USER_STATS = 'SET_USER_STATS'

/* --------------    ACTION CREATORS    ----------------- */
export const getUserStats = () => ({type: GET_USER_STATS})
export const setUserStats = stats => ({type: SET_USER_STATS, stats})

/* ------------------    REDUCER    --------------------- */
export default function reducer(userStats = {}, action) {
  switch (action.type){
    case GET_USER_STATS:
      return userStats
    case SET_USER_STATS:
      return action.stats
    default:
      return userStats
  }
}

/* ------------       THUNK CREATORS ------------------ */
// const resToData = res => res.data

// //creating a get request for a specific setlist
// export const userStats = userId => dispatch => {
//   return axios.get(`/api/search/stats/${userId}`)
//   .then(resToData)
//   .then(results => {
//     dispatch(setUserStats(JSON.parse(results)))
//     return results
//   })
// }
