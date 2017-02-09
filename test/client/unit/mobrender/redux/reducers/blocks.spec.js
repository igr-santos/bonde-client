import { expect } from 'chai'
import * as t from '~client/mobrender/redux/action-types'
import reducer, { initialState } from '~client/mobrender/redux/reducers/blocks'

describe('~client/mobrender/redux/reducers/blocks', () => {
  
  describe('doing fetch', () => {
    
    it('request', () => {
      const action = { type: t.FETCH_BLOCKS_REQUEST }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({
        ...initialState,
        fetching: true
      })
    })

    it('success', () => {
      const requestState = {...initialState,
        fetching: true
      }
      const data = [
        { id: 1 },
        { id: 2 }
      ]
      const action = { type: t.FETCH_BLOCKS_SUCCESS, payload: data }
      const nextState = reducer(requestState, action)
      expect(nextState).to.deep.equal({...requestState,
        isLoaded: true,
        fetching: false,
        data
      })
    })

    it('failure', () => {
      const  requestState = {...initialState,
        fetching: true
      }
      const error = '500 Internal Server Error'
      const action = { type: t.FETCH_BLOCKS_FAILURE, payload: error }
      const nextState = reducer(requestState, action)
      expect(nextState).to.deep.equal({...requestState,
        isLoaded: true,
        fetching: false,
        error
      })
    })
  })

  describe('doing update', () => {

    const fetchState = {...initialState,
      isLoaded: true,
      data: [
        { id: 1, name: 'Lorem' },
        { id: 2, name: 'Ipsum' }
      ]
    }

    const fetchRequestState = {...fetchState,
      saving: true
    }
    
    it('request', () => {
      const action = { type: t.UPDATE_BLOCK_REQUEST }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal(fetchRequestState)
    })

    it('success', () => {
      const block = { id: 1, name: 'Dolor' }
      const action = { type: t.UPDATE_BLOCK_SUCCESS, payload: block }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        data: fetchRequestState.data.map(b => {
          if (b.id === block.id) return block
          else return b
        })
      })
    })

    it('failure', () => {
      const error = '500 Internal Server Error'
      const action = { type: t.UPDATE_BLOCK_FAILURE, payload: error }
      const nextState = reducer(fetchRequestState, action)
      expect(nextState).to.deep.equal({...fetchRequestState,
        saving: false,
        error
      })
    })
  })

  describe('doing move', () => {
    const data = [
      { id: 1, name: 'Lorem' },
      { id: 2, name: 'Ipsum' },
      { id: 3, name: 'Dolor' }
    ]
    const fetchState = {...initialState,
      isLoaded: true,
      data
    }

    it('block up', () => {
      const action = { type: t.MOVE_BLOCK_UP, payload: data[1] }
      const nextState = reducer(fetchState, action)
      expect(nextState).to.deep.equal({...nextState,
        data: [data[1], data[0], data[2]]
      })
    })
  })
})
