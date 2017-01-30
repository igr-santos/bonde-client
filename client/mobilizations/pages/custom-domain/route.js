if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '~common/store'

const CustomDomainPageRoute = store => ({
  getComponents (location, cb) {
    require.ensure([], (require) => {
      injectAsyncReducer(store, 'mobilizations', require('~mobilizations/reducers').default)
      injectAsyncReducer(store, 'blocks', require('~mobilizations/blocks/reducers').default)
      injectAsyncReducer(store, 'widgets', require('~mobilizations/widgets/reducers').default)
      cb(null, require('./page.connected').default)
    })
  }
})

export default CustomDomainPageRoute
