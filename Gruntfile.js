module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'js/travmckinney.js': ['_js/index.js']
        }
      }
    },

    eslint: {
      src: ['_js/**/*.js'],
      options: {
        configFile: '.eslintrc',
      }
    },
    
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

    watch: {
      less: {
        files: ['_less/**/*.less'],
        tasks: ['less:production']
      },
      javascript: {
        files: [ 
          '_js/**/*'
        ],
        tasks: ['build']
      },
      jekyll: {
        files: ['_config.yml', '*.html', '_posts/**/*', '_layouts/**/*', '_includes/**/*', 'img/**/*', 'css/**/*', 'js/**/*'],
        tasks: ['jekyll:build']
      },
      options: {
        livereload: true,
      }
    },

    jekyll: {
      options: {
        bundleExec: true
      },
      build: {
      }
    },

    connect: {
      server: {
        options: {
          port: 3001,
          base: '_site/'
        }
      }
    }

  });

  grunt.registerTask('build', ['eslint', 'browserify']);
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('gruntify-eslint');
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
