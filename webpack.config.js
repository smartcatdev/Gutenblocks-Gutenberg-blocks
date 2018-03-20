const glob = require('glob'),
      fs = require('fs-extra')

const getBlocks = (path) => {
  let entries = {}
  fs.readdirSync(path)
    .forEach(file => {
      if (fs.statSync(`${path}/${file}`).isDirectory()) {
        entries[`${file}.editor`] = `${path}/${file}/block.js`
        entries[`${file}.site`] = `${path}/${file}/pkg.js`
      }
    })
  return entries
}

module.exports = {
  entry: getBlocks(`${__dirname}/src/core/blocks`),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            'styled-jsx/babel',
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-rest-spread'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@gblx': `${__dirname}/src/core`,
      '@wordpress': `${__dirname}/src/wordpress`,
      'scss': `${__dirname}/src/core/scss`
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/build`,
  }
}