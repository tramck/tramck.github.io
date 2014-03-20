module.exports = function(grunt) {
  grunt.initConfig({
    
    less: {
      production: {
        options: {
          paths: ['css'],
          cleancss: true
        },
        files: {
          'css/style.css': '_less/style.less'
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'js/travmckinney.js': '_coffee/travmckinney.coffee'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'js/travmckinney.min.js': ['_lib/*.js', 'js/travmckinney.js']
        }
      }
    },

    watch: {
      less: {
        files: ['_less/**/*.less'],
        tasks: ['less:production']
      },
      coffee: {
        files: ['_coffee/*.coffee'],
        tasks: ['coffee:compile']
      },
      uglify: {
        files: ['js/travmckinney.js'],
        tasks: ['uglify:dist']
      },
      options: {
        livereload: true,
      }
    },

    jekyll: {
      serve: {
        options: {
          serve: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.task.registerTask('default', ['watch', 'jekyll']);
}