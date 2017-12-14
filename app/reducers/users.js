import axios from 'axios'

/* -----------------    ACTION TYPES ------------------ */

const INITIALIZE = 'INITIALIZE_USERS'
const CREATE = 'CREATE_USER'
export const REMOVE = 'REMOVE_USER'
const UPDATE = 'UPDATE_USER'

/* ------------   ACTION CREATORS     ------------------ */

const init = users => ({ type: INITIALIZE, users })
export const create = user => ({ type: CREATE, user })
const remove = id => ({ type: REMOVE, id })
const update = user => ({ type: UPDATE, user })

/* ------------       REDUCER     ------------------ */

export default function reducer(users = [], action) {
  switch (action.type) {
  case INITIALIZE:
    return action.users

  case CREATE:
    return [action.user, ...users]

  case REMOVE:
    return users.filter(user => user.id !== action.id)

  case UPDATE:
    return users.map(user => (
      action.user.id === user.id ? action.user : user
    ))

  default:
    return users
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(init(res.data)))
}

// optimistic
export const removeUser = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err))
}

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err))
}

export const updateUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err))
}
