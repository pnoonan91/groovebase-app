import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SET_UPCOMING_TOUR_DATES = 'SET_UPCOMING_TOUR_DATES'
const GET_UPCOMING_TOUR_DATES = 'GET_UPCOMING_TOUR_DATES'

/* --------------    ACTION CREATORS    ----------------- */
export const setTourDates = tour => ({type: SET_UPCOMING_TOUR_DATES, tour})
export const getTourDates = () => ({type: GET_UPCOMING_TOUR_DATES})

/* ------------------    REDUCER    --------------------- */
export default function reducer(tourDates = {}, action) {
  switch(action.type) {
    case SET_UPCOMING_TOUR_DATES:
      return action.tour
    case GET_UPCOMING_TOUR_DATES:
      return tourDates
    default:
      return tourDates
  }
}

/* ------------       THUNK CREATORS ------------------ */
const resToData = res => res.data

export const tourSearch = search => dispatch => {
  return axios.get(`/api/search/tourdates/${search}`)
  .then(resToData)
  .then(results => {
    dispatch(setTourDates(JSON.parse(results)))
    return results
  })
}
