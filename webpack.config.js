const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './src/app/js/app.js',
  output: {
    path: path.resolve('static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    proxy: {
      "/api": "http://localhost:8000",
      "/ad": "http://localhost:8000",
    }
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [HtmlWebpackPluginConfig]
}
