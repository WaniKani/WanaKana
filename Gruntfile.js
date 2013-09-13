module.exports = function(grunt) {
	grunt.initConfig({

		generatedJSPath: 'src/js/',
		coffeeSrcPath: 'src/coffee/',
		externalJSPath: 'src/libs/',
		htmlPath: 'src/html/',
		deployPath: 'lib/',
		testPath: 'test/',
		demoPath: 'demo/',

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

		coffeelint: {
			options: {
				"max_line_length": {'value':120 },
				"no_trailing_whitespace" : {'level': 'warn'}
			},
			all: ['<%=coffeeSrcPath%>*.coffee']
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

		copy: {
			deploy: {
				files: [{
					src: ['**/*.js'],
					dest: '<%=deployPath%>',
					cwd: '<%=generatedJSPath%>',
					filter: 'isFile',
					expand: true
				}]
			}
		},

		open: {
            test : {
              path: '<%=testPath%>/index.html',
              app: 'Google Chrome'
            },
            demo : {
              path: '<%=demoPath%>/index.html',
              app: 'Google Chrome'
            }
        },

		watch: {
			coffee: {
				files: '<%=coffeeSrcPath%>**/*.coffee',
				tasks: ['lint', 'coffee:dev'],
			}
		},

		bump: {
          options: {
            files: ['package.json'],
            updateConfigs: [],
            commit: true,
            commitMessage: 'Version v%VERSION%',
            commitFiles: ['package.json'], // '-a' for all files
            createTag: true,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false
          }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-coffeelint');
	grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default', ['dev']);
	grunt.registerTask('dev', ['lint', 'coffee:dev', 'qunit']);
	grunt.registerTask('lint', ['coffeelint']);
	grunt.registerTask('test', ['lint', 'coffee:dev', 'open:test']);
	grunt.registerTask('demo', ['deploy', 'open:demo']);
	grunt.registerTask('deploy', ['clean', 'lint', 'coffee:deploy', 'uglify:deploy', 'copy:deploy', 'qunit']);

};
