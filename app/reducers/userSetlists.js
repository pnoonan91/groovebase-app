import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SET_USER_SETLISTS = 'SET_USER_SETLISTS'

/* --------------    ACTION CREATORS    ----------------- */
export const setUserSetlists = setlists => ({type: SET_USER_SETLISTS, setlists})

/* ------------------    REDUCER    --------------------- */
export default function reducer(userSetlists = [], action) {
  switch (action.type){
    case SET_USER_SETLISTS:
      return action.setlists
    default:
      return userSetlists
  }
}

/* ------------       THUNK CREATORS ------------------ */
// const resToData = res => res.data

// //creating a get request for setlists belonging to a specific user
// export const retrieveUserSetlists = search => dispatch => {
//   return axios.get(`/api/shows/${currentUser.id}`)
//   .then(resToData)
//   .then(results => {
//     dispatch(getUserSetlists(results))
//     return results
//   })
// }
