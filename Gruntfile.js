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
      jekyll: {
        files: ['_config.yml', '*.html', '_posts/**/*', '_layouts/**/*', '_includes/**/*', 'img/**/*', 'css/**/*'],
        tasks: ['jekyll:build']
      },
      options: {
        livereload: true,
      }
    },

    jekyll: {
      build: {
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '_site/'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.task.registerTask('default', ['jekyll', 'connect:server', 'watch']);

  grunt.task.registerTask('post', 'Create new jekyll posts from templates.', function() {
    var name = grunt.option('name'),
        category = grunt.option('cat'),
        date = new Date(),
        today = grunt.template.date(date, 'yyyy-mm-dd'),
        template,
        formatedName,
        data,
        content;

    if (name) {
      formatedName = name.replace(/[^a-z0-9]|\s+|\r?\n|\r/gmi, '-').toLowerCase();
      category = category ? category : 'blog';
      data = {
        name: name,
      };
      template = grunt.file.read('_post-template-' + category + '.md');
      content = grunt.template.process(template, {
        data: data
      });
      grunt.file.write('_posts/' + category + '/' + today + '-' + formatedName + '.md', content);
    }
    else {
      grunt.fail.warn('Name Required: `grunt post --name "My Post Name"`');
    }
  });
}