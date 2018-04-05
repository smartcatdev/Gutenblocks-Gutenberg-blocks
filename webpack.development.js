const merge = require('webpack-merge'),
      config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
})