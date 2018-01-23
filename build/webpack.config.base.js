const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['latest', 'react']
          }
        }]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['json-loader']
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf|svg)/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './font/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: './images/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      hash: true
    })
  ]
}
