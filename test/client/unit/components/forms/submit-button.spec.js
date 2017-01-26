import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { SubmitButton } from '~components/forms'

describe('client/components/forms/submit-button', () => {

  it('should render without crashed', () => {
    const btn = mount(<SubmitButton />)
    expect(btn).to.be.ok
  })

  it('should render children like text button', () => {
    const btn = mount(<SubmitButton>Done!</SubmitButton>)
    expect(btn.find('button').text()).to.equal('Done!')
  })

  it('should disable button while is submit', () => {
    const btn = mount(<SubmitButton submitting={true} />)
    expect(btn.find('button').props().disabled).to.equal(true)
  })

  it('should disable button while input is not blur', () => {
    const btn = mount(<SubmitButton pristine={true} />)
    expect(btn.find('button').props().disabled).to.equal(true)
  })
})
