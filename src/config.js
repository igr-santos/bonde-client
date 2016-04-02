import 'babel-polyfill';

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
  app: {
    title: 'Our Cities',
    description: 'Mobilization helper for Our Cities Network',
    head: {
      titleTemplate: 'Reboo: %s',
      meta: [
        {name: 'description', content: 'Mobilization helper for Our Cities Network'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Our Cities'},
        {property: 'og:locale', content: 'pt_BR'},
        {property: 'og:title', content: 'Our Cities'},
        {property: 'og:description', content: 'Mobilization helper for Our Cities Network'},
        {property: 'og:creator', content: 'Our Cities Network'}
      ]
    }
  }
}, environment);
