import TestUtils from 'react-addons-test-utils'
import MobilizationSettings from './../../containers/MobilizationSettings.jsx'
import ConfigurationsMenu from './../../components/ConfigurationsMenu.jsx'

import stubRouterContext from './../stubRouterContext'
const mobilization = {}
const location = {}

describe('MobilizationSettings', () => {
  it('should render MobilizationMenu', () => {
    const children = <div>Test</div>

    const WrapedComponent = stubRouterContext(MobilizationSettings, {
      mobilization: mobilization,
      location: location,
      children: children
    })

    const component = TestUtils.renderIntoDocument(<WrapedComponent />)

    expect(
      TestUtils.scryRenderedComponentsWithType(component, ConfigurationsMenu)
    ).to.have.length(1)
  })
})
