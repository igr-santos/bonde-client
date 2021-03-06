import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Tabs } from '../'

describe('app/components/Navigation/Tabs', () => {
  describe('#render', () => {
    it('should render one root .tabs <nav> element', () => {
      const wrapper = shallow(<Tabs />)
      expect(wrapper.find('nav.tabs')).to.have.length(1)
    })
    it('should render one <div> element as a children', () => {
      const wrapper = shallow(<Tabs><div>Foo</div></Tabs>)
      expect(wrapper.find('.tabs div')).to.have.length(1)
    })
  })
})
