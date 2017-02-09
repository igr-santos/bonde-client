import { combineReducers } from 'redux'

import widgetsReducer from './widgets'
import editionReducer from './edition'
import hoverReducer from './hover'

export default combineReducers({
  widgets: widgetsReducer,
  edition: editionReducer,
  hover: hoverReducer
})
