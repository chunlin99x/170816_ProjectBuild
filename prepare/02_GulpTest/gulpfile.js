var gulp = require('gulp')
/*var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var less = require('gulp-less')
var cleanCss = require('gulp-clean-css')
var htmlmin = require('gulp-htmlmin')

var connect = require('gulp-connect')*/
var open = require('open')
var $ = require('gulp-load-plugins')()

// 处理js
gulp.task('jsTask', function() {
  return gulp.src('src/js/*.js') //操作的源文件
    .pipe($.concat('built.js', {newLine: ';'})) //合并到临时文件
    .pipe(gulp.dest('dist/js')) //生成到目标文件夹
    .pipe($.rename({suffix: '.min'})) //重命名
    .pipe($.uglify())    //压缩
    .pipe(gulp.dest('dist/js'))
    .pipe($.connect.reload())
})

//less处理任务
gulp.task('lessTask', function () {
  return gulp.src('src/less/*.less')
    .pipe($.less())
    .pipe(gulp.dest('src/css'))
    .pipe($.connect.reload())
})

//css处理任务, 指定依赖的任务
gulp.task('cssTask',['lessTask'], function () {
  return gulp.src('src/css/*.css')
    .pipe($.concat('built.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe($.connect.reload())
})

//压缩html任务
gulp.task('htmlTask', function() {
  return gulp.src('index.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
})

// 定义默认任务
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