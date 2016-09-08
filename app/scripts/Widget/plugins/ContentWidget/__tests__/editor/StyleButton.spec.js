import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import StyleButton from '../../editor/StyleButton'


describe('<StyleButton />', () => {
  let wrapper
  const defaultProps = {
    onToggle: () => {},
    label: 'UL',
    style: 'unordered-list-item',
  }

  beforeEach(() => {
    wrapper = mount(<StyleButton {...defaultProps} />)
  })

  it('should render label by default', () => {
    expect(wrapper.find('a').text()).to.equal('UL')
  })

  it('should render icon when iconClass passed', () => {
    wrapper.setProps({ 'iconClass': 'fa fa-list-ul' })
    expect(wrapper.find('i.fa.fa-list-ul').length).to.equal(1)
  })

  it('should set class active when active is true', () => {
    wrapper.setProps({ active: true })
    expect(wrapper.find('a').props().className).to.contain('bg-blue')
  })
})
