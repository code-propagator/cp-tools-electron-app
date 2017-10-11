// var webpack = require('webpack')
var path = require('path')
const UglifyEsPlugin = require('uglify-es-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'app/win/out')
var APP_DIR = path.resolve(__dirname, 'app')

var config = {
  entry: APP_DIR + '/win/renderer.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        query: {
          comments: false,
          compact: true,
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader?modules' ]
      }
    ]
  },
  plugins: [
    new UglifyEsPlugin()
  ]
}

module.exports = config
