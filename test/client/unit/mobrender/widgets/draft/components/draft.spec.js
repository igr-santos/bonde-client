import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Draft } from '~client/mobrender/widgets/draft/components'
import widgets from '~client/mobrender/widgets/config'

describe('mobrender/widgets/draft/components/draft', () => {
  const props = {
    widget: {
      id: 1,
      kind: 'draft',
      settings: {}
    },
    update: widget => widget
  }

  it('should render without crashed', () => {
    const draft = mount(<Draft {...props} />)
    expect(draft).to.be.ok
  })

  it('should render buttons to update kind', () => {
    const plugins = widgets.filter(w => w.kind !== 'draft')
    const draft = mount(<Draft {...props} />)
    expect(draft.find('DraftButton').length).to.equal(plugins.length)
  })

  it('should pass to update method widget props when clicked button', () => {
    let widgetProps
    const draft = mount(
      <Draft {...props} update={props => widgetProps = props} />
    )
    const button = draft.find('DraftButton').at(0)
    button.find('button').simulate('click')

    const { kind, settings } = widgets.filter(w => w.kind === button.props().kind)[0]
    expect({ ...props.widget, kind, settings }).to.deep.equal(widgetProps)
  })
})
