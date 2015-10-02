import React from 'react/addons'
import { Navbar, DropDownMenu } from './../../components'

const { TestUtils } = React.addons
const blocks = {data: [{}, {}, {}]}
const mobilization = {
  color_scheme: 'my-color-scheme',
  header_font: 'my-header-font',
  body_font: 'my-header-font'
}

let navbarComponent

describe('Navbar', () => {
  before(() => {
    navbarComponent = TestUtils.renderIntoDocument(
      <Navbar blocks={blocks} mobilization={mobilization} />
    )
  })

  describe('#renderNavbarButtons', () => {
    it('should return one NavbarButton for each block', () => {
      const navbarButtons = navbarComponent.renderNavbarButtons(false)
      expect(navbarButtons).to.have.length(blocks.data.length)
    })

    it('should return each NavbarButton with a class "block" when mobile is true', () => {
      const navbarButtons = navbarComponent.renderNavbarButtons(true)
      navbarButtons.forEach((navbarButton) => {
        expect(navbarButton.props.className).to.include('block')
      })
    })
  })

  describe('#render', () => {
    it('should render a DropDownMenu', () => {
      expect(
        TestUtils.scryRenderedComponentsWithType(navbarComponent, DropDownMenu)
      ).to.have.length(1)
    })
  })
})
