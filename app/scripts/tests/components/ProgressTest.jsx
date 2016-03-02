import TestUtils from 'react-addons-test-utils'
import { Progress } from './../../components'

describe('Progress', () => {
  describe('#render', () => {
    it('should render unselected and bind onClick event', () => {
      const component = TestUtils.renderIntoDocument(
        <Progress className="foobar" percent={34} />
      )
      const container = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[1]
      expect(container.props.className).to.equal('foobar')
      expect(container.props.style).to.eql({width: '34%'})
    })
  })
})
