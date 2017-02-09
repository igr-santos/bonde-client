import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import WidgetOverlay from '~client/mobrender/components/widget-overlay'

describe('mobrender/components/widget-overlay', () => {
  const props = {
    widget: { id: 1, kind: 'content' },
    hasMouseOver: false,
    onClick: () => {},
    onMouseOver: () => {},
    onMouseOut: () => {}
  }
  let over

  beforeEach(() => {
    over = mount(<WidgetOverlay {...props} />)
  })

  it('should render without crashed', () => {
    expect(over).to.be.ok
  })

  it('should render children', () => {
    const over2 = mount(
      <WidgetOverlay {...props}>
        <h1>Children</h1>
      </WidgetOverlay>
    )
    expect(over2.find('h1').length).to.equal(1)
  })

  it('should call onMouseOver passing ("widget", widget.id) when mouse over', () => {
    let result
    over.setProps({ onMouseOver: (key, id) => result = [key, id] })
    over.find('div.relative').simulate('mouseover')
    expect(result).to.deep.equal(['widget', props.widget.id])
  })

  it('should call onMouseOut passing ("widget") when mouse out', () => {
    let result
    over.setProps({ onMouseOut: key => result = [key, ] })
    over.find('div.relative').simulate('mouseout')
    expect(result).to.deep.equal(['widget'])
  })

  it('should render cursor pointer', () => {
    expect(over.find('div.relative').props().style).to.deep.equal({
      cursor: 'pointer'
    })
  })

  it('should call onClick when click', () => {
    let result
    over.setProps({
      onClick: () => result = true
    })
    over.find('div.relative').simulate('click')
    expect(result).to.equal(true)
  })

  it('should render over div when has mouse over', () => {
    over.setProps({ hasMouseOver: true })
    expect(over.find('div.overlay').length).to.equal(1)
  })
})
