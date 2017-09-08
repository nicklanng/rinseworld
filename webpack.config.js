module.exports = {
  entry: {
    index: './src/main.js'
  },
  output: {
    filename: 'dist/[name].js',
    sourceMapFilename: '[file].map'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
