module.exports = function(grunt) {
  grunt.initConfig({

    generatedJSPath: 'src/js/',
    coffeeSrcPath: 'src/coffee/',
    externalJSPath: 'src/libs/',
    deployPath: 'deploy/',
    testPath: 'test/',

    coffeeFiles : [{
                expand: true,
                cwd: '<%=coffeeSrcPath%>',
                src: '**/*.coffee',
                dest: '<%=generatedJSPath%>',
                ext: '.js'
            }],


    clean: ["<%=deployPath%>", "<%=generatedJSPath%>"],
    coffee: {
        dev : {
            options: {
                sourceMap: true,
                bare: true
            },
            files : '<%= coffeeFiles %>'
        },

        deploy: {
            options: {
                sourceMap: false,
                bare: true
            },
             files : '<%= coffeeFiles %>'
        }
    },

    jshint: {
      all: ['<%=generatedJSPath%>']
    },

    uglify: {
      deploy: {
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: '<%=generatedJSPath%>',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: '<%=deployPath%>/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
        }]
      }
    },

    qunit: {
        files: ['<%=testPath%>**/*.html']
    },

    shell: {
      openTestsInBrowser: {
        command: 'open <%=testPath%>index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['coffee:dev', 'lint', 'qunit']);
  grunt.registerTask('lint', ['coffee:dev', 'jshint']);
  grunt.registerTask('test', ['coffee:dev', 'lint', 'shell:openTestsInBrowser']);
  grunt.registerTask('deploy', ['clean', 'coffee:deploy', 'lint', 'uglify:deploy', 'qunit']);
};
