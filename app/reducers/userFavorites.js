import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SET_USER_FAVORITES = 'SET_USER_FAVORITES'

/* --------------    ACTION CREATORS    ----------------- */
export const setUserFavorites = favorites => ({type: SET_USER_FAVORITES, favorites})

/* ------------------    REDUCER    --------------------- */
export default function reducer(userFavorites = [], action) {
  switch (action.type){
    case SET_USER_FAVORITES:
      return action.favorites
    default:
      return userFavorites
  }
}
