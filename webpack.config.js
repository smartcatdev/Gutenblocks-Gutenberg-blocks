const glob = require('glob'),
      fs = require('fs-extra')

const getBlocks = (path) => {
  let entries = {}
  fs.readdirSync(path)
    .forEach(file => {
      if (fs.statSync(`${path}/${file}`).isDirectory()) {
        entries[`${file}.editor`] = `${path}/${file}/index.js`
        entries[`${file}.site`] = `${path}/${file}/pkg.js`
      }
    })
  return entries
}

module.exports = {
  entry: getBlocks(`${__dirname}/src/core/blocks`),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      },
      {
        test: /^((?!\.?global).)*scss$/,
        use: [
          { loader: 'style-loader' }, 
          {
            loader: 'css-loader',
            options: {
              module: true
            }
          }, 
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.?global.scss$/,
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