import * as t from '../action-types'

export const initialState = {
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case t.FETCH_BLOCKS_REQUEST:
      return {...state,
        fetching: true
      }
    case t.FETCH_BLOCKS_SUCCESS:
      return {...state,
        isLoaded: true,
        fetching: false,
        data: action.payload
      }
    case t.FETCH_BLOCKS_FAILURE:
      return {...state,
        isLoaded: true,
        fetching: false,
        error: action.payload
      }
    case t.UPDATE_BLOCK_REQUEST:
      return {...state,
        saving: true
      }
    case t.UPDATE_BLOCK_SUCCESS:
      return {...state,
        saving: false,
        data: state.data.map(
          b => b.id === action.payload.id ? action.payload : b
        )
      }
    case t.UPDATE_BLOCK_FAILURE:
      return {...state,
        saving: false,
        error: action.payload
      }
    default:
      return state
    }
}
