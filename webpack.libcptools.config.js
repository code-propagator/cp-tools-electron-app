// var webpack = require('webpack')
var path = require('path')
const UglifyEsPlugin = require('uglify-es-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'local_modules/cp-tools/libcptools')
var APP_DIR = path.resolve(__dirname, 'local_modules')

var config = {
  entry: APP_DIR + '/cp-tools/cptools/index.js',
  output: {
    path: BUILD_DIR,
    filename: '../libcptools.js'
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
