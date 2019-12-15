const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ENV = process.env.NODE_ENV || 'production'

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './src/app.js',
  },
  output: {
    filename: './build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', {modules: false}],
          ]
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          warnings: false,
          ie8: false,
          safari10: false,
          dead_code: true,
          comments: false,
          compress: {
            inline: false
          }
        }
      }), 
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(ENV) }
    })
  ]
}