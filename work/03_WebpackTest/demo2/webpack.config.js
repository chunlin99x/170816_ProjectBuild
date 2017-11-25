/*
webpack的配置是commonjs的对象模块
  // 入口
  // 出口
  // 模块加载器
  // 插件
 */
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')  // node内置操作路径相关信息的模块
// __dirname: node内部定义的一个变量: 值为当前执行文件所在文件夹的绝对路径
console.log(path.resolve(__dirname, 'dist'))

module.exports = { // 配置对象
  // 入口
  //entry: './src/index.js', //入口js的相对路径
  entry: {
    app: './src/index.js'
  },
  // 出口
  output: {
    path: path.resolve(__dirname, 'dist'),   // 所有打包生成的资源的基本路径(绝对)
    filename: 'static/js/[name].js'
  },
  // 模块加载器
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/, // 配置css样式文件
        use: ['style-loader', 'css-loader']
      },
      // 处理图片
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader',  // 依赖于file-loader
        options: { // 一旦指定了options, 只能通过loader配置来指定loader, 且值只能是串
          limit: 7000,
          name: 'static/img/[name].[ext]'  // [name]代表文件  [ext]代表文件扩展名
        }
      }
    ]
  },

  // 插件
  plugins: [
    // 清理文件
    new CleanPlugin('dist'),
    // 生成html
    new HtmlPlugin({
      template: 'index.html', // 在当前文件夹下找
      filename: 'index.html' // 生成到dist
    })
  ]
}