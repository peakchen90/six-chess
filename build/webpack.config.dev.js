const WebpackMerge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

module.exports = WebpackMerge(baseConfig, {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // 开启全局的模块热替换（HMR）
    new webpack.HotModuleReplacementPlugin(),

    // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    port: devPort,
    hot: true,
    proxy: {
    }
  }
})
