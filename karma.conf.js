// Karma configuration
// Generated on Sun Nov 26 2017 12:48:45 GMT+0000 (GMT)

const { TRAVIS } = process.env;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'viewport'],


    // list of files / patterns to load in the browser
    files: [
      {
        pattern: '{0,1,2,3,4,5}-module/*task/*.js',
      },
      {
        pattern: '{6,7,8,9}-module/*task/*.js',
        type: 'module',
      },
      {
        pattern: 'assets/lib/*.js',
        type: 'module',
      }
    ],


    // list of files to exclude
    exclude: [
      '**/webpack.config.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [TRAVIS ? 'json' : 'mocha'], // progress

    jsonReporter: {
      stdout: true,
      // outputFile: 'results/results.json' // defaults to none
    },


    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE,

    browserConsoleLogOptions: {
      terminal: true
    },


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
}
