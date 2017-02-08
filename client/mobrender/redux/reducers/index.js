import { combineReducers } from 'redux'

import widgetsReducer from './widgets'
import editionReducer from './edition'

export default combineReducers({
  widgets: widgetsReducer,
  edition: editionReducer
})
