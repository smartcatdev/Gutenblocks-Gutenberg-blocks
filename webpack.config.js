const { flatMap, assign } = require('lodash')

const BLOCKS = [
  'colour-cta',
  'image-cta',
  'widget-columns',
  'featured-posts'
]

const ENTRY_POINTS = {
  'block-editor': `${__dirname}/block-editor/index.js`
}

const blockPaths = flatMap(BLOCKS, entry => [ 
    { [`${entry}/editor`]: `${__dirname}/blocks/${entry}/block.js` }, 
    { [`${entry}/public`]: `${__dirname}/blocks/${entry}/pkg.js`   } 
])
.reduce(
  (entries, entry) => assign(entries, entry)
)

module.exports = {
  entry: assign(ENTRY_POINTS, blockPaths),
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
      'scss':  `${__dirname}/scss`
    }
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      }
    }
  }
}