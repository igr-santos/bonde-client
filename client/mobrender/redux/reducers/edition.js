import * as t from '../action-types'

export const initialState = {
  isEditing: false,
  mode: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.TURN_ON_EDITION_MODE:
      return {...state,
        isEditing: true,
        mode: action.payload
      }
    case t.TURN_OFF_EDITION_MODE:
      return {...state,
        isEditing: false,
        mode: undefined
      }
    default:
      return state
  }
}

