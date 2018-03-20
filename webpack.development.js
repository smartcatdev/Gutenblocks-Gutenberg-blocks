const merge = require('webpack-merge'),
      config = require('./webpack.config')

module.exports = merge(config, {
  devtool: 'inline-source-map',
})