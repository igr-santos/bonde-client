// Karma configuration
// Generated on Fri Jul 03 2015 10:56:54 GMT-0300 (BRT)
var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
    './app/scripts/tests/globals.js',
      'webpack.test.config.es5.js',
      'node_modules/babel-polyfill/dist/polyfill.js'
    ],

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        moduleDirectories: [ 'node_modules' ],
        extensions: [ '', '.js', '.jsx' ]
      },

      module: {
        loaders: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'API_URL': '"http://localhost:3000"',
            'NODE_ENV': '"test"'
          }
        }),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'webpack.test.config.js': [ 'babel' ]
    },

		babelPreprocessor: {
			options: {
				presets: ['es2015'],
				sourceMap: 'inline'
			},
			filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
			},
			sourceFileName: function (file) {
				return file.originalPath;
			}
		},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered
      // (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
