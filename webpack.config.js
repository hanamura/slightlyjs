module.exports = {
  entry: './src/slightly.js',
  output: {
    filename: 'lib/slightly.js'
  },
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
