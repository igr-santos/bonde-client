import { expect } from 'chai'

import reducer from './block-reducers'
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


describe('block-reducers', () => {

  const block = {
    id: 1,
    bg_class: 'bg-gray',
    bg_image: 'http://imageseack.og/'
  }
  
  it('t.MOUSE_OVER', () => {
    const action = {
      type: t.MOUSE_OVER,
      payload: block
    }
    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      mouseOver: block.id,
      bgClass: block.bg_class,
      bgImage: block.bg_image
    })
  })

  it('t.MOUSE_OUT', () => {
    const action = { type: t.MOUSE_OUT }
    const nextState = reducer({
      ...initialState,
      mouseOver: block.id,
      bgClass: block.bg_class,
      bgImage: block.bg_image
    }, action)
    expect(nextState).to.deep.equal(initialState)
  })

  it('t.EDIT_BACKGROUND', () => {
    const action = { type: t.EDIT_BACKGROUND, payload: true }
    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      editingBackground: true
    })
  })

  it('t.EDIT_WIDGET', () => {
    const action = { type: t.EDIT_WIDGET, payload: true }
    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal({
      ...initialState,
      editingWidget: true
    })
  })
})
