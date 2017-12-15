import axios from 'axios'
import history from '../history'

/* ------------------    ACTION TYPES --------------------- */
const SEARCH = 'SET_CURRENT_SEARCH'
const GETSEARCH = 'GET_CURRENT_SEARCH'

/* --------------    ACTION CREATORS    ----------------- */
const currentSearch = results => ({type: SEARCH, results})
export const getSearch = () => ({type: GETSEARCH})

/* ------------------    REDUCER    --------------------- */
export default function reducer(currentSearch = {}, action) {
  switch (action.type){
    case SEARCH:
      return action.results
    case GETSEARCH:
      return currentSearch
    default:
      return currentSearch
  }
}

/* ------------       THUNK CREATORS ------------------ */
const resToData = res => res.data

//creating a search request to the backend
export const setlistSearch = search => dispatch => {
  return axios.post('/api/search/setlist', search)
  .then(resToData)
  .then(results => {
    dispatch(currentSearch(JSON.parse(results)))
    return results
  })
}

//composed search with redirect to search result page
export const setlistSearchResultsPage = search => dispatch => {
  dispatch(setlistSearch(search))
  .then(results => history.push('/search/setlist'))
  .catch(err => console.error(err))
}
