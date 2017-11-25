var gulp = require('gulp')
var concat = require('gulp-concat') // 函数
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')

// 定义构建任务
// 1. 处理js
gulp.task('jsTask', function () {
  return gulp.src('src/js/*.js') // 读取所有js源文件
    .pipe(concat('built.js', {newLine: ';'}))  // 合并
    .pipe(gulp.dest('dist/js')) // 将内存合并的js保存到指定的目录
    .pipe(rename({suffix: '.min'})) //重命名
    .pipe(uglify())  // 内存中压缩js
    .pipe(gulp.dest('dist/js'))
})

// 2. 处理less
// 3. 处理css
// 4. 处理html