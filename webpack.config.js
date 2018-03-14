const glob = require('glob')

module.exports = {
  entry: {
    editor: `${__dirname}/src/index.js`,
    site: glob.sync(`${__dirname}/src/**/pkg.js`)
  },
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
      '@wordpress': `${__dirname}/src/wordpress`
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/build`,
  }
}