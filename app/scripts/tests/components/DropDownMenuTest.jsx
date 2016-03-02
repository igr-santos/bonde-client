import TestUtils from 'react-addons-test-utils'
import { DropDownMenu } from './../../components'

let component
let props = { text: 'Foo bar' }

describe('DropDownMenu', () => {
  before(() => {
    component = TestUtils.renderIntoDocument(
      <DropDownMenu {...props}>
        <p>foo</p>
        <p>bar</p>
      </DropDownMenu>
    )
  })

  describe('#constructor', () => {
    it('should set initial state', () => {
      expect(component.state).to.eql({ open: false })
    })
  })

  describe('#handleClick', () => {
    it('should toggle open state', () => {
      component.setState({open: false})
      component.handleClick()
      expect(component.state).to.eql({ open: true })
      component.handleClick()
      expect(component.state).to.eql({ open: false })
    })
  })

  describe('#handleOverlayClick', () => {
    it('should set open state to false', () => {
      component.setState({open: true})
      component.handleOverlayClick()
      expect(component.state).to.eql({ open: false })
      component.handleOverlayClick()
      expect(component.state).to.eql({ open: false })
    })
  })

  describe('#renderIcon', () => {
    it('should not render when not passed icon', () => {
      const icon = component.renderIcon()
      expect(icon).to.be.undefined
    })

    it('should render when passed icon', () => {
      component = TestUtils.renderIntoDocument(
        <DropDownMenu {...props} icon="test-icon">
          <p>foo</p>
          <p>bar</p>
        </DropDownMenu>
      )
      const icon = component.renderIcon()
      expect(icon.props.className).to.equal('fa fa-test-icon')
    })
  })

  describe('#renderOverlay', () => {
    it('should not render when closed', () => {
      component.setState({open: false})
      const overlay = component.renderOverlay()
      expect(overlay).to.be.undefined
    })

    it('should render when open', () => {
      component.setState({open: true})
      const overlay = component.renderOverlay()
      expect(overlay).not.to.be.undefined
    })
  })

  describe('#renderChildren', () => {
    it('should render children with added onItemClick prop set to handleOverlayClick', () => {
      const children = component.renderChildren()
      const paragraphs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'p')
      expect(paragraphs).to.have.length(2)
      expect(paragraphs[0].props.onItemClick.toString()).to.equal(component.handleOverlayClick.bind(component).toString())
      expect(paragraphs[1].props.onItemClick.toString()).to.equal(component.handleOverlayClick.bind(component).toString())
    })
  })

  describe('#render', () => {
    it('should render button and bind click', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button')
      expect(button.getDOMNode().textContent.trim()).to.equal('Foo bar')
      expect(button.props.onClick.toString()).to.equal(component.handleClick.bind(component).toString())
    })

    it('should render render icon', () => {
      const renderIconStub = sandbox.stub(component, 'renderIcon')
      component.render()
      expect(renderIconStub).to.have.been.calledOnce
    })

    it('should render children', () => {
      const renderChildrenStub = sandbox.stub(component, 'renderChildren')
      component.render()
      expect(renderChildrenStub).to.have.been.calledOnce
    })

    it('should render render overlay', () => {
      const renderOverlayStub = sandbox.stub(component, 'renderOverlay')
      component.render()
      expect(renderOverlayStub).to.have.been.calledOnce
    })
  })
})
