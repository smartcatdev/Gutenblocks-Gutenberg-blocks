module.exports = {
  entry: {
    blocks: `${__dirname}/src/index.ts`
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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