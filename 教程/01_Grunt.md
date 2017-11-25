# 1. 入门
## 1). Grunt介绍
    中文主页 : http://www.gruntjs.net/
    是一套前端自动化构建工具，一个基于nodeJs的命令行工具
    它是一个任务运行器, 配合其丰富强大的插件
    常用功能:
        合并文件(js/css)
        压缩文件(js/css)
        语法检查(js)
        less/sass预编译处理 
        其它...
      
## 2). Grunt插件介绍
	1.理解: 
		Grunt本身并没有处理各种资源的功能, 这功能得通过基于Grunt的一类工具实现: Grunt插件
    2.Grunt插件列表:
		http://www.gruntjs.net/plugins 
    3.插件分类:
    	grunt团队贡献的插件 : 插件名大都以contrib-开头
      	第三方提供的插件 : 大都不以contrib-开头
    4.常用的插件:
      	grunt-contrib-clean——清除文件(打包处理生成的)
      	grunt-contrib-concat——合并多个文件的代码到一个文件中
      	grunt-contrib-uglify——压缩js文件
      	grunt-contrib-jshint——javascript语法错误检查；
      	grunt-contrib-cssmin——压缩/合并css文件
      	grunt-contrib-htmlmin——压缩html文件
      	grunt-contrib-imagemin——压缩图片文件(无损)
      	grunt-contrib-copy——复制文件、文件夹
      	grunt-contrib-watch——实时监控文件变化、调用相应的任务重新执行
      
# 2. 基本使用
## 1). 下载工具包
    npm install -g grunt-cli
    npm install --save-dev grunt
    
## 2). 创建应用目录结构 
    |- dist----------构建生成的文件所在的文件夹
    |- src------------源码文件夹   
        |- js---------------js源文件夹
        |- css--------------css源文件夹
    |- index.html-----页面文件
    |- Gruntfile.js---grunt配置文件(注意首字母大写)
    |- package.json---项目包配置文件
        {
          "name": "grunt_test",
          "version": "1.0.0"   
        }

## 3). 项目编码
    1. src/js/test1.js
        (function () {
        	function add(num1, num2) {
        		return num1 + num2
        	}
        	console.log(add(23, 56))
        })()
    2. src/js/test2.js
        (function () {
          var arr = [2,3,4].map(function (item, index) {
            return item+1;
          });
          console.log(arr);
        })()
    3. src/css/test1.css
        #box1 {
          width: 100px;
          height: 100px;
          background: red;
        }
    4. src/css/test2.css
        #box2 {
          width: 200px;
          height: 200px;
          background: blue;
        }

## 4). grunt配置
    module.exports = function (grunt) {
      // 1. 初始化插件配置
      grunt.initConfig({
        // 合并JS
        concat: {
          options: {
            separator: ';',//连接符 ;
          },
          dist: {
            src: ['src/js/*.js'],//找目标原文件
            dest: 'dist/js/build.js',//输出的文件路径及文件名字
          },
        },
        // 压缩合并后的JS
        uglify: {
          build: {
            files: {
              'dist/js/build.min.js': ['dist/js/build.js']
            }
          }
        },
        // 合并+压缩css
        cssmin:{
          build: {
            files: {
              'dist/css/build.min.css': ['src/css/*.css']
            }
          }
        }
      })
    
      // 2. 加载插件任务
      grunt.loadNpmTasks('grunt-contrib-concat')
      grunt.loadNpmTasks('grunt-contrib-uglify')
      grunt.loadNpmTasks('grunt-contrib-cssmin')
    
      // 3. 注册构建任务
      grunt.registerTask('default', ['concat', 'uglify', 'cssmin'])
    }

## 5). 下载
    npm install -g grunt-cli
    npm install --save-dev grunt
    npm install --save-dev grunt-contrib-concat
    npm install --save-dev grunt-contrib-uglify
    npm install --save-dev grunt-contrib-cssmin
    
## 6). index.html
    <link rel="stylesheet" href="dist/css/build.min.css">
    <div id="box1"></div>
    <div id="box2"></div>
    <script type="text/javascript" src="dist/js/build.min.js"></script>

## 7). 打包应用
    grunt