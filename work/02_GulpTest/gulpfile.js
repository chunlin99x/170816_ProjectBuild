var gulp = require('gulp')
/*var concat = require('gulp-concat') // 函数
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var less = require('gulp-less')
var cleanCss = require('gulp-clean-css')
var htmlmin = require('gulp-htmlmin')
var connect = require('gulp-connect')*/
var open = require('open')
var $ = require('gulp-load-plugins')()

// 定义构建任务
// 1. 处理js
gulp.task('jsTask', function () {
  return gulp.src('src/js/*.js') // 读取所有js源文件
    .pipe($.concat('built.js', {newLine: ';'}))  // 合并
    .pipe(gulp.dest('dist/js')) // 将内存合并的js保存到指定的目录
    .pipe($.rename({suffix: '.min'})) //重命名
    .pipe($.uglify())  // 内存中压缩js
    .pipe(gulp.dest('dist/js'))
    .pipe($.connect.reload())
})

// 2. 处理less
gulp.task('lessTask', function () {
  return gulp.src('src/less/*.less')
    .pipe($.less())
    .pipe(gulp.dest('src/css'))
    .pipe($.connect.reload())
})

// 3. 处理css
gulp.task('cssTask', ['lessTask'],  function () { // 先执行依赖任务, 执行完后再执行当前任务
  return gulp.src('src/css/*.css')
    .pipe($.concat('bulit.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe($.connect.reload())
})


// 4. 处理html
gulp.task('htmlTask', function () {
  return gulp.src('index.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe($.connect.reload())
})

// 5. 定义默认任务
gulp.task('default', ['jsTask', 'cssTask', 'htmlTask'])

//注册live-reload任务
gulp.task('server',['default'], function () {
  //配置服务器选项
  $.connect.server({
    root : 'dist/',//监视的源目标文件路径
    livereload : true,//是否实时刷新
    port : 5000//开启端口号
  })
  open('http://localhost:5000/')

  //确认监视的目标并且绑定相应的任务
  gulp.watch('src/js/*.js', ['jsTask'])
  gulp.watch(['src/css/*.css', 'src/less/*.less'], ['cssTask'])
})