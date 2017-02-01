import * as t from './block-action-types'

const createAction = (type, payload) => ({ type, payload })

export const mouseOver = block => dispatch => {
  return dispatch(createAction(t.MOUSE_OVER, block))
}

export const mouseOut = () => dispatch => {
  return dispatch(createAction(t.MOUSE_OUT))
}

export const editBackground = (editOn = false) => dispatch => {
  return dispatch(createAction(t.EDIT_BACKGROUND, editOn))
}

export const editWidget = (editOn = false) => dispatch => {
  return dispatch(createAction(t.EDIT_WIDGET, editOn))
}
