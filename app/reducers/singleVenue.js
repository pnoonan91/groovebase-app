import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SET_CURRENT_VENUE = 'SET_CURRENT_VENUE'
const GET_CURRENT_VENUE = 'GET_CURRENT_VENUE'

/* --------------    ACTION CREATORS    ----------------- */
export const setCurrentVenue = venue => ({type: SET_CURRENT_VENUE, venue})
export const getCurrentVenue = () => ({type: GET_CURRENT_VENUE})

/* ------------------    REDUCER    --------------------- */
export default function reducer(singleVenue = {}, action) {
  switch(action.type) {
    case SET_CURRENT_VENUE:
      return action.venue
    case GET_CURRENT_VENUE:
      return singleVenue
    default:
      return singleVenue
  }
}

/* ------------       THUNK CREATORS ------------------ */
const resToData = res => res.data

export const venueSearch = search => dispatch => {
  return axios.get(`/api/search/singlevenue/${search}`)
  .then(resToData)
  .then(results => {
    dispatch(setCurrentVenue(results))
    return results
  })
}
