const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = WebpackMerge(baseConfig, {
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      // assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    })
  ]
})