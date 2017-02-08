import { combineReducers } from 'redux'
import widgetsReducer from '~client/mobrender/reducers/widgets'
// Children module dependencies
import templates from '../templates/reducers'
// Current module dependencies
import list from './list'

export default combineReducers({
  list,
  templates,
  widgets: widgetsReducer
})
