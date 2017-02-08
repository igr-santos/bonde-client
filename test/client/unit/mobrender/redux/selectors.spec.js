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

  describe('#widgetHasMouseOver', () => {
    const widget = { id: 1, kind: 'draft' }
    const nextState = state.mergeDeep(fromJS({
      mobilizations: {
        widgets: {
          overId: widget.id
       }
      }
    })).toJS()

    it('should be true if props.widget equals mouseOver', () => {
      const selectors = Selectors(nextState, { widget })
      expect(selectors.widgetHasMouseOver()).to.equal(true)
    })

    it('should be false if props.widget not equals mouseOver', () => {
      const selectors = Selectors(nextState, { widget: { id: 2, kind: 'content' } })
      expect(selectors.widgetHasMouseOver()).to.equal(false)
    })
  })
})
