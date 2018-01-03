import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SET_CURRENT_ARTIST = 'SET_CURRENT_ARTIST'
const GET_CURRENT_ARTIST = 'GET_CURRENT_ARTIST'

/* --------------    ACTION CREATORS    ----------------- */
export const setCurrentArtist = artist => ({type: SET_CURRENT_ARTIST, artist})
export const getCurrentArtist = () => ({type: GET_CURRENT_ARTIST})

/* ------------------    REDUCER    --------------------- */
export default function reducer(singleArtist = {}, action){
  switch(action.type){
    case SET_CURRENT_ARTIST:
      return action.artist
    case GET_CURRENT_ARTIST:
      return singleArtist
    default:
      return singleArtist
  }
}

/* ------------       THUNK CREATORS ------------------ */
const resToData = res => res.data

export const artistSearch = search => dispatch => {
  return axios.get(`/api/search/singleartist/${search}`)
  .then(resToData)
  .then(results => {
    dispatch(setCurrentArtist(results))
    return results
  })
}
