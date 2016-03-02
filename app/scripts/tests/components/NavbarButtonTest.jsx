import TestUtils from 'react-addons-test-utils'
import { NavbarButton } from './../../components'

let renderedComponent
let children
let className
let targetId

describe('NavbarButton', () => {
  describe('#handleClick', () => {
    // TODO: in order to test this method we should find a way to mock jquery,
    // or remove this dependency
  })

  describe('#render', () => {
    before(() => {
      const shallowRenderer = TestUtils.createRenderer()
      shallowRenderer.render(
        <NavbarButton className={className} targetId={targetId}>
          {children}
        </NavbarButton>
      )
      renderedComponent = shallowRenderer.getRenderOutput()
    })

    it('should render an anchor', () => {
      expect(renderedComponent.type).to.be.eql('a')
    })

    it('should add an onClick event listener to the anchor', () => {
      expect(renderedComponent.props.onClick).to.be.a('function')
    })
  })
})
