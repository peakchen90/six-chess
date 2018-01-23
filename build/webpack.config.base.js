const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(srcDir, 'main.js')
  },
  output: {
    path: distDir,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, '../src/common'),
      images: path.resolve(__dirname, '../assets/images')
    }
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
      template: path.resolve(srcDir, 'index.html'),
      filename: path.resolve(distDir, 'index.html'),
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash: true
    })
  ]
}
