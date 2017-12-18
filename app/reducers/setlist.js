import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SET_CURRENT_SETLIST = 'SET_CURRENT_SETLIST'
const GET_CURRENT_SETLIST = 'GET_CURRENT_SETLIST'

/* --------------    ACTION CREATORS    ----------------- */
export const setCurrentSetlist = setlist => ({type: SET_CURRENT_SETLIST, setlist})
export const getCurrentSetlist = () => ({type: GET_CURRENT_SETLIST})

/* ------------------    REDUCER    --------------------- */
export default function reducer(currentSetlist = {}, action) {
  switch (action.type){
    case SET_CURRENT_SETLIST:
      return action.setlist
    case GET_CURRENT_SETLIST:
      return currentSetlist
    default:
      return currentSetlist
  }
}

/* ------------       THUNK CREATORS ------------------ */
const resToData = res => res.data

//creating a get request for a specific setlist
export const setlistSearch = search => dispatch => {
  return axios.post(`/api/search/setlist/single`, search)
  .then(resToData)
  .then(results => {
    dispatch(setCurrentSetlist(JSON.parse(results)))
    return results
  })
}
