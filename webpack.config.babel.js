import {join} from 'path'

const include = join(__dirname, 'src')

export default {
  devtool: 'source-map',
  entry: {
    filename: './src/app.js',
  },
  output: {
    path: join(__dirname,'dist_umd'),
    libraryTarget: 'umd',
    library: 'arquiteturasalvage'
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
        },
        include
      }
    ]
  },
}