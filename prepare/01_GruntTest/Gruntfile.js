module.exports = function (grunt) {
  // 1. 初始化插件配置
  grunt.initConfig({
    // 合并JS
    concat: {
      options: {
        separator: ';',//连接符 ;
      },
      build: {
        files: {
          'dist/js/build.js': ['src/js/*.js']
        }
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