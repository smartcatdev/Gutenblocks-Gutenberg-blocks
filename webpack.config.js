module.exports = {
  entry: {
    blocks: `${__dirname}/src/index.js`
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