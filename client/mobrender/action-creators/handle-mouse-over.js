import { createAction } from './create-action
import * as t from '../action-types'

export default widgetId => dispatch => dispatch(createAction(t.WIDGET_MOUSE_OVER, widgetId))
