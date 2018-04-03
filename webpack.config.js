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
  entry: getBlocks(`${__dirname}/blocks`),
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
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@wordpress': `${__dirname}/wordpress`,
      '@gblx': `${__dirname}/core`,
      'scss': `${__dirname}/scss`
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`,
  }
}