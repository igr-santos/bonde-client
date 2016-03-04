import TestUtils from 'react-addons-test-utils'
import { CustomDomainWrapper } from '../../pages/CustomDomainWrapper/CustomDomainWrapper.jsx'
import ShowMobilization from '../../pages/ShowMobilization.jsx'

describe('CustomDomainWrapper', () => {
  it('should not render ShowMobilization when there is no mobilization', () => {
    const component = TestUtils.renderIntoDocument(
      <CustomDomainWrapper mobilizations={{data: []}} />
    )

    const divs = TestUtils.scryRenderedComponentsWithType(component, ShowMobilization)
    expect(divs.length).to.be.eql(0)
  })

  it('should render ShowMobilization when there is a mobilization', () => {
    const component = TestUtils.renderIntoDocument(
      <CustomDomainWrapper
        mobilizations={{data: [{id: 1}]}}
        blocks={{data: []}}
        widgets={{data: []}}
      />
    )

    const divs = TestUtils.scryRenderedComponentsWithType(component, ShowMobilization)
    expect(divs.length).to.be.eql(1)
  })
})
