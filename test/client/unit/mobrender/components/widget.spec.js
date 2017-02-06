import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Widget } from '~client/mobrender/components'


describe('mobrender/components/widget', () => {
  const props = {
    widget: { id: 1, kind: 'draft', sm_size: 3, md_size: 3, lg_size: 3 },
    update: widget => {}
  }
  
  it('should render without crashed', () => {
    const widget = mount(<Widget {...props} />)
    expect(widget).to.be.ok
  })

  it('should contains classes to resize component', () => {
    const { sm_size, md_size, lg_size } = props.widget
    const className = `col-${sm_size} sm-col-${sm_size} md-col-${md_size} lg-col-${lg_size}`
    const widget = mount(<Widget {...props} />)
    expect(widget.find('div').at(0).props().className).to.contains(className)
  })

  it('should render component children according kind', () => {
    const widget = mount(<Widget {...props} />)
    expect(widget.find('Draft').length).to.equal(1)
  })

  it('should render component loading while saving widget', () => {
    const widget = mount(<Widget {...props} saving={true} />)
    expect(widget.find('Loading').length).to.equal(1)
  })

  it('should passed widget and update to children', () => {
    const widget = mount(<Widget {...props} />)
    expect(widget.find('Draft').props()).to.deep.equal(props)
  })

  it('should render overlay when editable', () => {
    const widget = mount(<Widget {...props} editable={true} />)
    expect(widget.find('WidgetOverlay').length).to.equal(1)
  })

  it('should not render overlay when editable is false', () => {
    const widget = mount(<Widget {...props} />)
    expect(widget.find('WidgetOverlay').length).to.equal(0)
  })
})
