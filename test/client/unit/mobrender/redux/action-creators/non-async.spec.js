import { expect } from 'chai'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import * as MobActions from '~client/mobrender/redux/action-creators'
import * as t from '~client/mobrender/redux/action-types'
import { createAction } from '~client/mobrender/redux/action-creators/create-action'


describe('client/mobrender/redux/action-creators (non-async)', () => {

  let store

  beforeEach(() => {
    store = configureStore([ thunk ])() 
  })
  
  it('handleMouseOut', () => {
    const expected = createAction(t.WIDGET_MOUSE_OUT)
    store.dispatch(MobActions.handleMouseOut())
    expect(store.getActions().length).to.equal(1)
    expect(store.getActions()[0]).to.deep.equal(expected)
  })

  it('handleMouseOver', () => {
    const expected = createAction(t.WIDGET_MOUSE_OVER, 1)
    store.dispatch(MobActions.handleMouseOver(1))
    expect(store.getActions().length).to.equal(1)
    expect(store.getActions()[0]).to.deep.equal(expected)
  })
})
