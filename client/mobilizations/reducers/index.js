import { combineReducers } from 'redux'

// Children module dependencies
import templates from '../templates/reducers'

// Current module dependencies
import list from './list'

export default combineReducers({
  list,
  templates
})
