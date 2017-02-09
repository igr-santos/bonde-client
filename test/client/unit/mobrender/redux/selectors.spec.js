import { expect } from 'chai'
import { fromJS } from 'immutable'

import { reducer as rootReducer } from '~client/mobrender/redux'
import Selectors from '~client/mobrender/redux/selectors'

const state = fromJS({
  mobilizations: rootReducer
})

describe('~client/mobrender/redux/selectors', () => {

  describe('#getMobilizations', () => {
    const data = [{ id: 1, name: 'Lorem' }, { id: 2, name: 'Ipsum' }]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        list: {
          isLoaded: true,
          currentId: data[1].id,
          data
        }
      }
    })).toJS()

    it('should get current mobilization', () => {
      expect(Selectors(nextState).getMobilization()).to.deep.equal(data[1])
    })
  })

  describe('#hasMouseOver', () => {
    const widget = { id: 1, kind: 'draft' }
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        hover: {
          'widget': widget.id
       }
      }
    })).toJS()

    it('should be true if (key, id) equals mouseOver in state', () => {
      const selectors = Selectors(nextState)
      expect(selectors.hasMouseOver('widget', widget.id)).to.equal(true)
    })

    it('should be false if (key, id) not equals mouseOver or not exists in state', () => {
      const selectors = Selectors(nextState)
      expect(selectors.hasMouseOver('widget', 999)).to.equal(false)
    })
  })

  describe('move block', () => {
    const data = [
      { id: 1, name: 'Lorem' },
      { id: 2, name: 'Ipsum' },
      { id: 3, name: 'Dolor' }
    ]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        blocks: {
          isLoaded: true,
          data
        }
      }
    })).toJS()

    describe('#canMoveUp', () => {

      it('should be true if props.block isnt first of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveUp()).to.equal(true)
      })

      it('should be false if props.block is first of data', () => {
        const selectors = Selectors(nextState, { block: data[0] })
        expect(selectors.canMoveUp()).to.equal(false)
      })
    })
    
    describe('#canMoveDown', () => {

      it('should be true if props.block isnt last of data', () => {
        const selectors = Selectors(nextState, { block: data[1] })
        expect(selectors.canMoveDown()).to.equal(true)
      })

      it('should be false if props.block is last of data', () => {
        const selectors = Selectors(nextState, { block: data[2] })
        expect(selectors.canMoveDown()).to.equal(false)
      })
    })
  })

  describe('#getBlocks', () => {
    const data = [{ id: 1, name: 'Lorem' }]
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        blocks: {
          isLoaded: true,
          data
        }
      }
    })).toJS()

    it('should return blocks loaded', () => {
      const selectors = Selectors(nextState)
      expect(selectors.getBlocks()).to.deep.equal(data)
    })
  })
})
