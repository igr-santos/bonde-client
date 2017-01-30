import React, { Component, PropTypes } from 'react'
import ReactGA from 'react-ga'

// Global module dependencies
import { TechnicalIssues } from '~components/error'
import { GoogleFontsLoader } from '~components/fonts'
import * as arrayUtil from '~utils/array'

// Current module dependencies
import { Mobilization } from '~mobilizations/components'

export class CustomDomain extends Component {
  componentDidMount () {
    const isTest = process.env.NODE_ENV === undefined || process.env.NODE_ENV === 'test'
    if (!isTest) {
      const { mobilization } = this.props

      ReactGA.initialize('UA-26278513-30')
      ReactGA.pageview('/' + mobilization.slug)

      if (mobilization.google_analytics_code) {
        ReactGA.initialize(
          mobilization.google_analytics_code,
          { gaOptions: { name: 'MobilizationTracker' } }
        )
        ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
      }
    }
  }

  render () {
    const { mobilization } = this.props

    if (mobilization) {
      const { header_font: headerFont, body_font: bodyFont } = mobilization

      return (
        <div>
          <Mobilization {...this.props} />
          <GoogleFontsLoader fonts={[headerFont, bodyFont].filter(arrayUtil.distinct)} />
        </div>
      )
    }
    return <TechnicalIssues />
  }
}

CustomDomain.propTypes = {
  mobilization: PropTypes.object,
  blocks: PropTypes.array.isRequired,
  widgets: PropTypes.array.isRequired
}

export default CustomDomain
