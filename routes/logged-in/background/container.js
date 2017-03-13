import React, { PropTypes } from 'react'

import { Background } from '~client/components/layout'
import { ZendeskWidget } from '~components/external-services'

let bgImage
if (process.env.BROWSER) {
  bgImage = require('~client/images/bg-login.png')
}

const BackgroundContainer = ({ children }) => (
  <div>
    <ZendeskWidget />
    <Background image={bgImage}>
      {children}
    </Background>
  </div>
)

BackgroundContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default BackgroundContainer
