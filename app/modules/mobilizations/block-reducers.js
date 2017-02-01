import * as t from './block-action-types'

const initialState = {
  mouseOver: undefined,
  editingBackground: false,
  editingWidget: false,
  bgClass: undefined,
  bgImage: undefined,
  uploadProgress: undefined,
  loading: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.MOUSE_OVER:
      return {
         ...state,
         mouseOver: action.payload.id,
         bgClass: action.payload.bg_class,
         bgImage: action.payload.bg_image
      }
    case t.MOUSE_OUT:
      return {
        ...state,
        mouseOver: undefined,
        bgClass: undefined,
        bgImage: undefined
      }
    case t.EDIT_BACKGROUND:
      return {
        ...state,
        editingBackground: action.payload
      }
    case t.EDIT_WIDGET:
      return {
        ...state,
        editingWidget: action.payload
      }
    default:
      return state
  }
}
