# 1. 入门
## 1). 介绍
	中文主页: http://www.gulpjs.com.cn/
	gulp是与grunt功能类似的前端项目构建工具, 也是基于Nodejs的自动任务运行器
	能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的
    合并、压缩、检查、监听文件变化、浏览器自动刷新、测试等任务
	gulp更高效(异步多任务), 更易于使用, 插件高质量

## 2). gulp插件
	gulp-concat : 合并文件(js/css)
    gulp-uglify : 压缩js文件
    gulp-rename : 文件重命名
    gulp-less : 编译less
    gulp-clean-css : 压缩css
    gulp-htmlmin: 压缩html
    gulp-connect: 实现live-reload
    gulp-load-plugins: 实现插件自动引入

## 3). gulp相关API
    gulp.task(name, [deps], fn) 
          	* 定义一个任务
	gulp.src(filePath/pathArr)
    	* 指向指定路径的所有文件, 返回文件流对象
      	* 用于读取文件
    gulp.dest(dirPath/pathArr)
      	* 指向指定的所有文件夹
      	* 用于向文件夹中输出文件
    gulp.watch()
      	* 监视文件的变化

# 2. 基本使用
## 1). 创建项目目录结构
	|- dist
	|- src
    	|- js
    	|- css
    	|- less
	|- index.html
	|- gulpfile.js-----gulp配置文件
	|- package.json
	    {
	      "name": "gulp_test",
	      "version": "1.0.0"
	    }

## 2). 安装依赖包
	npm install -g gulp
	npm install --save-dev gulp
	npm install --save-dev gulp-concat gulp-uglify gulp-rename
	npm install --save-dev gulp-less gulp-clean-css
	npm install --save-dev gulp-htmlmin

## 3). 编码
    1. src/js/test1.js
        (function () {
          function add(num1, num2) {
            return num1 + num2
          }
          console.log(add(10, 60))
        })()
    2. src/js/test2.js
        (function () {
          var arr = [2,3,4].map(function (item, index) {
            return item+1
          })
          console.log(arr)
        })()
    3. src/css/test1.css
        #div1 {
            width: 100px;
            height: 100px;
            background: blue;
        }
    4. src/css/test2.css
        #div2 {
            width: 200px;
            height: 200px;
            background: deeppink;
        }
    5. src/less/test3.less
        @base: yellow;
        .index1 { color: @base; }
        .index2 { color: green; }
        
## 3). gulp配置: gulpfile.js
    var gulp = require('gulp')
    var concat = require('gulp-concat')
    var uglify = require('gulp-uglify')
    var rename = require('gulp-rename')
    var less = require('gulp-less')
    var cleanCss = require('gulp-clean-css')
    var htmlmin = require('gulp-htmlmin')
	
	// 处理js
    gulp.task('jsTask', function() {
      return gulp.src('src/js/*.js') //操作的源文件
        .pipe(concat('built.js', {newLine: ';'})) //合并到临时文件
        .pipe(gulp.dest('dist/js')) //生成到目标文件夹
        .pipe(rename({suffix: '.min'})) //重命名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'))
    })
    
    //less处理任务
    gulp.task('lessTask', function () {
      return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'))
    })
    
    //css处理任务, 指定依赖的任务
    gulp.task('cssTask',['lessTask'], function () {
      return gulp.src('src/css/*.css')
        .pipe(concat('built.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
    })
    
    //压缩html任务
    gulp.task('htmlTask', function() {
      return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
    })
    
    // 定义默认任务
    gulp.task('default', ['jsTask', 'cssTask', 'htmlTask'])

# 3. 高级使用
## 1). 自动刷新(live-reload)
    1. 下载插件
        npm install --save-dev gulp-connect open
        
    2. 配置
        var connect = require('gulp-connect')
        var open = require('open')
        
        // 所有任务最后都加上
        .pipe(connect.reload())
        
        //注册live-reload任务
        gulp.task('server',['default'], function () {
          //配置服务器选项
          connect.server({
            root : 'dist/',//监视的源目标文件路径
            livereload : true,//是否实时刷新
            port : 5000//开启端口号
          })
          open('http://localhost:5000/')
        
          //确认监视的目标并且绑定相应的任务
          gulp.watch('src/js/*.js', ['jsTask'])
          gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssTask'])
        })
    
## 2). gulp插件自动引入
    1. 下载插件
        npm install --save-dev gulp-load-plugins
    2. 配置
        var $ = require('gulp-load-plugins')()
        // 注释所有gulp插件模块的引入
        // 所有插件模块函数通过$.xxx来引入使用
        // 注意: 所有需要的插件必须已经下载好