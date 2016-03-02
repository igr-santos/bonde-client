import TestUtils from 'react-addons-test-utils'
import { TwitterShareButton } from './../../components'

describe('TwitterShareButton', () => {
  it('should open a popup on click', () => {
    const component = TestUtils.renderIntoDocument(
      <TwitterShareButton href='http://meurio.org.br' text='Change the world!' />
    )

    const button = React.findDOMNode(component.refs.button)
    const stubOpen = sinon.spy()
    window.open = stubOpen

    TestUtils.Simulate.click(button)

    expect(stubOpen).to.have.been.calledWith(
      'https://twitter.com/intent/tweet?text=Change the world!&url=http://meurio.org.br',
      'Compartilhar no Twitter',
      'width=800,height=600'
    )
  })
})
