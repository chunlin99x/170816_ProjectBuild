# 1. 入门
## 1). webpack是什么?
    中文主页: https://doc.webpack-china.org/
    Webpack 是一个打包模块化项目资源的工具，在 Webpack 里一切文件皆模块
    项目中的资源是相互关联的节点, 通过入口js形成一个网(图)的结构
    利用loader和plugin输出由多个模块组合成的文件
    
## 2). webpack四个核心概念
    Entry：入口，Webpack进行打包的起始点(文件)
    Output：出口，webpack编译打包生成的bundle(文件)
    Loader：模块加载(转换)器，将非js模块包装成webpack能理解的js模块
    Plugin：插件，在 Webpack 构建流程中的特定时机插入具有特定功能的代码
  
# 2. 基本使用
## 1). 初始化项目
    创建空应用: demo1
    npm init -y
    
## 2). 下载webpack
    npm install webpack -g   //全局下载webpack
    npm install webpack --save-dev  //下载webpack为开发依赖
    
## 3). 编码
    1. bar.js
      export default function bar() {
        console.log('bar()')
      }
    2. app.js
      import bar from './bar'
      bar()
      document.getElementById('app').innerHTML = 'Hello, webpack'
    3. page.html
      <html>
        <head>
          <title>Hello webpack</title>
        </head>
        <body>
          <div id="app"></div>
          <script src="bundle.js"></script>
        </body>
      </html>
      
## 4). 使用webpack打包项目
    1). webpack配置: wbpack.config.js
      module.exports = {
        // 入口
        entry: './app.js',
        // 出口
        output: {
          filename: 'bundle.js'
        }
      }
    2). 编译打包
      webpack
    3). 浏览器打开page.html, 查看运行效果

# 3. 打包各种资源
## 1). 目标
    1. 利用loader打包项目中的各种类型资源: CSS / 图片 / JSON
    2. 利用plugin生成动态引入打包文件的html页面
    3. 掌握webpack配置文件编写(结构)
    4. 进一步理解模块化打包
    
## 2). 下载依赖包
    1. jquery包
        npm install --save jquery@1.12
    3. 处理css文件的包
        npm install --save-dev css-loader style-loader
    4. 处理图片的包
        npm install --save-dev url-loader file-loader
    5. 处理HTML
        npm install --save-dev html-webpack-plugin
    
## 3). 编码
    1. 创建整体结构
        demo2
            |--src
                |--assets
                    |--css
                    |--img
                    |--json
                | --js
                |--index.js
            |--index.html
            |--webpack.config.js
    2. index.html
        <div id="box1"></div>
        <div id="box2"></div> 
    3. 添加图片: 
        assets/img/big.jpg
        assets/img/logo.jpg
		
    4. 添加样式: assets/css/style.css
        #box1{
          width: 300px;
          height: 300px;
          background-image: url("../img/logo.jpg");
        }
        #box2{
          width: 300px;
          height: 300px;
          background-image: url("../img/big.jpg");
        }
    5. 添加json: assets/json/data.json
        {
          "name": "Tom",
          "age": 12
        }
    6. 添加自定义JS模块: src/js/math.js
        export function square(x) {
          return x * x
        }
        export function cube(x) {
          return x * x * x
        }
    7. 实现入口js编码: src/index.js
        import $ from 'jquery'
        import {cube} from "./js/math"
        import data from './assets/json/data.json'
        import './assets/css/style.css'
        
        document.write("Hello atguigu")
        document.write('<br />' + cube(3))
        document.write('<br />' + JSON.stringify(data))
        
        $('body').css('background', 'gray')

## 4). 配置
    1. webpack配置: webpack.config.js
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
            })
          ]
        }
    2). 添加打包命令配置: package.json
        "scripts": {
          "build": "webpack",
          "server": "serve dist"
        }

# 5). 打包发布运行项目  
    npm run build
    npm install -g serve
    npm run server
    访问: http://localhost:5000

# 4. 实现live-reload
## 1). 下载依赖模块
    npm install --save-dev webpack-dev-server
    
## 2). 修改配置: package.json
    "scripts": {
      "dev": "webpack-dev-server",
    }

## 3). 开发打包运行项目
    npm run dev
    访问: http://localhost:8080
