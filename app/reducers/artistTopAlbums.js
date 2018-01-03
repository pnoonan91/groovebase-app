import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SET_ARTIST_TOP_ALBUMS = 'SET_ARTIST_TOP_ALBUMS'
const GET_ARTIST_TOP_ALBUMS = 'GET_ARTIST_TOP_ALBUMS'

/* --------------    ACTION CREATORS    ----------------- */
export const setArtistTopAlbums = artist => ({type: SET_ARTIST_TOP_ALBUMS, artist})
export const getArtistTopAlbums = () => ({type: GET_ARTIST_TOP_ALBUMS})

/* ------------------    REDUCER    --------------------- */
export default function reducer(artistTopAlbums={}, action){
  switch(action.type){
    case SET_ARTIST_TOP_ALBUMS:
      return action.artist
    case GET_ARTIST_TOP_ALBUMS:
      return artistTopAlbums
    default:
      return artistTopAlbums
  }
}

/* ------------       THUNK CREATORS ------------------ */
const resToData = res => res.data

export const topAlbumSearch = search => dispatch => {
  return axios.post(`/api/search/topalbums`, search)
    .then(resToData)
    .then(results => {
      dispatch(setArtistTopAlbums(JSON.parse(results)))
      return results
    })
}
