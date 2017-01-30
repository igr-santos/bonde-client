import { provideHooks } from 'redial'
import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'

// Global module dependencies
import DefaultServerConfig from '~server/config'

// Children modules dependencies
import * as BlockActions from '~mobilizations/blocks/action-creators'
import * as WidgetActions from '~mobilizations/widgets/action-creators'

// Current module dependencies
import * as MobilizationSelectors from '~mobilizations/selectors'
import * as MobilizationActions from '~mobilizations/action-creators'
import { CustomDomainPage } from '~mobilizations/pages'

const redial = {
  fetch: ({ dispatch, host }) => {
    // eslint-disable-next-line
    const regex = host.match(`(.+)\.${DefaultServerConfig.appDomain}`)
    const findParams = regex ? { slug: regex[1].replace(/^www\./, '') } : { custom_domain: host }

    return Promise.all([
      dispatch(MobilizationActions.asyncFilter(findParams)),
      dispatch(BlockActions.asyncBlockSelect(findParams)),
      dispatch(WidgetActions.asyncWidgetSelect(findParams))
    ])
  }
}

const mapStateToProps = state => ({
  mobilization: MobilizationSelectors.getList(state)[0],
  blocks: state.blocks.data,
  widgets: state.widgets.list.data
})

const CustomDomainPageConnected = props => {
  return (
    <div className={css(styles.root)}>
      <Helmet title='CustomDomainPageConnected' />
      <h2 className={css(styles.title)}>CustomDomainPageConnected</h2>
      <CustomDomainPage {...props} />
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(CustomDomainPageConnected))
