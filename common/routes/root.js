import React from 'react'
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

if (process.env.BROWSER) {
  require('~node_modules/font-awesome/scss/font-awesome.scss')
  require('~client/styles/main.scss')
}

import App from '~common/components/app'
import DefaultServerConfig from '../../server/config'
import { route as CustomDomainRoute } from '~mobilizations/pages/custom-domain'

export default function createRoutes (store) {
  const { sourceRequest: { host } } = store.getState()

  // eslint-disable-next-line
  const hasSubdomain = host.match(`(.+)\.${DefaultServerConfig.appDomain}`)

  const root = hasSubdomain ? {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./login').default,
          require('./not-found').default
        ])
      })
    },
    indexRoute: {
      ...CustomDomainRoute(store)
    }
  } : {
    path: '/',
    component: App,
    indexRoute: {
      component: <h1>Hello World</h1>
    }
  }

  return root
}
