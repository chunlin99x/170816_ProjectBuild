const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].js'
  },

  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 图片
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/img/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanPlugin(['dist']),
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ]
}