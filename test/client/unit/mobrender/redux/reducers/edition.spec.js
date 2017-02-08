import { expect } from 'chai'
import * as t from '~client/mobrender/redux/action-types'
import reducer, { initialState } from '~client/mobrender/redux/reducers/edition'


describe('~client/mobrender/redux/reducers/edition', () => {
  
  describe('TURN_ON_EDITION_MODE', () => {
    
    it('should turn on edition mode', () => {
      const action = { type: t.TURN_ON_EDITION_MODE }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({...initialState,
        isEditing: true
      })
    })

    it('should set payload like mode', () => {
      const action = { type: t.TURN_ON_EDITION_MODE, payload: 'widget' }
      const nextState = reducer(initialState, action)
      expect(nextState).to.deep.equal({...initialState,
        isEditing: true,
        mode: 'widget'
      })
    })
  })

  describe('TURN_OFF_EDITION_MODE', () => {
    
    const turnOnState = {...initialState,
      isEditing: true,
      mode: 'background'
    }

    it('should turn off edition mode', () => {
      const action = { type: t.TURN_OFF_EDITION_MODE }
      const nextState = reducer(turnOnState, action)
      expect(nextState).to.deep.equal(initialState)
    })
  })
})
