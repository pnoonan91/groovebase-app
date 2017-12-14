import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
)
