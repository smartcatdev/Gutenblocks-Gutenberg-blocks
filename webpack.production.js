const merge = require('webpack-merge'),
      webpack= require('webpack')
      config = require('./webpack.config'),
      MiniCSSExtractPlugin = require('mini-css-extract-plugin')
      UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(config, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader' }, 
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})