import TestUtils from 'react-addons-test-utils'
import { DropDownMenuItem } from './../../components'

let component, clickString

const onClick = () => { clickString = clickString + 'bar' }
const onItemClick = () => { clickString = 'foo' }
const props = {disabled: false, onClick: onClick, onItemClick: onItemClick}

describe('DropDownMenuItem', () => {
  describe('#handleClick', () => {
    beforeEach(() => {
      clickString = null
    })

    it('should call both onItemClick and onClick when not disabled', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} />
      )
      const event = { preventDefault() {}}
      component.handleClick(event)
      expect(clickString).to.be.equal('foobar')
    })

    it('should not call onItemClick or onClick when disabled', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} disabled={true} />
      )
      const event = { preventDefault() {}}
      component.handleClick(event)
      expect(clickString).to.be.null
    })
  })

  describe('#render', () => {
    it('should render enabled and bind onClick event', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} />
      )
      const link = TestUtils.findRenderedDOMComponentWithTag(component, 'a')
      expect(link.getDOMNode().getAttribute('disabled')).to.be.null
      expect(link.props.onClick.toString()).to.equal(component.handleClick.bind(component).toString())
    })

    it('should render disabled', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenuItem {...props} disabled={true} />
      )
      const link = TestUtils.findRenderedDOMComponentWithTag(component, 'a')
      expect(link.getDOMNode().getAttribute('disabled')).not.to.be.null
    })
  })
})
