module.exports = function (config) {
  config.set({
    autoWatch: false,
    browsers: ['Chrome'],
    files: ['test/*.js'],
    frameworks: ['mocha'],
    preprocessors: {
      'test/*.js': ['webpack']
    },
    reporters: ['mocha'],
    singleRun: true,
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              'babel-loader'
            ]
          }
        ]
      }
    }
  })
}
