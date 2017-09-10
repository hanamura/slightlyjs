module.exports = function (config) {
  config.set({
    autoWatch: false,
    browsers: ['Chrome'],
    files: ['test/*.js'],
    frameworks: ['mocha'],
    singleRun: true
  })
}
