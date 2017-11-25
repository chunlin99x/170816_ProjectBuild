# 1. 课程目标
    1). 理解项目构建/打包, 构建工具的作用
    2). 了解grunt的基本使用
    3). 掌握gulp的基本使用
    4). 熟练掌握webpack的使用
    
# 2. 项目构建理解
## 1). 什么是项目构建?
    编译项目中的js, sass, less
    合并js/css等资源文件
    压缩js/css/html等资源文件
    JS语法的检查
    ...
    
## 2). 构建工具的作用?
    简化项目构建, 自动化完成构建

# 3. grunt(了解)
    前端自动化的打包工具
    拥有很多强大的插件
    配置文件名为: Gruntfile.js
    
# 4. gulp(掌握-)
    功能与grunt类似
    拥有更多的插件, 打包速度更快
    配置文件名为: gruntfile.js
    可以实现live-reload
    gulp对象常用API:
        gulp.task()
        gulp.src()
        gulp.dest()
        gulp.watch()
    常用插件:
        gulp-concat : 合并文件(js/css)
        gulp-uglify : 压缩js文件
        gulp-rename : 文件重命名
        gulp-less : 编译less
        gulp-clean-css : 压缩css
        gulp-htmlmin: 压缩html
        gulp-connect: 实现live-reload
        gulp-load-plugins: 实现插件自动引入

# 5. webpack(掌握)
## 1). webpack的理解
    模块化打包工具
    一切文件皆模块
    从入口js开始递归找出所有相关的资源模块, 打包成1个或少量几个chunk/bundle文件
    
## 2). webpack的4个核心概念
    Entry：入口，Webpack进行打包的起始点(文件)
    Output：出口，webpack编译打包生成的bundle(文件)
    Loader：模块加载(转换)器，将非js模块包装成webpack能理解的js模块
    Plugin：插件，在 Webpack 构建流程中的特定时机插入具有特定功能的代码
    
## 3). 常见的loader和plugin
    1. loader
        css-loader
        style-loader
        file-loader
        url-loader
    2. plugin
        html-webpack-plugin
        clean-webpack-plugin
        
## 3). webpack的基本配置
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

## 4). 实现live-reload
    npm install webpack-dev-server
    "scripts": {
      "dev": "webpack-dev-server",
    }
    运行: npm run dev
    
## 详细教程
- [01_Grunt](教程/01_Grunt.md)
- [02_Gulp](教程/02_Gulp.md)
- [03_Webpack](教程/03_Webpack.md)

xxxx
yyyy
zzzz
