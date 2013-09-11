module.exports = function(grunt) {
	grunt.initConfig({

		generatedJSPath: 'src/js/',
		coffeeSrcPath: 'src/coffee/',
		externalJSPath: 'src/libs/',
		htmlPath: 'src/html/',
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

		copy: {
			html: {
				files: [{ 
                    src: [ '**/*.html' ],
                    dest: '<%= deployPath %>/demo/',
                    cwd: '<%= htmlPath %>',
                    expand: true
                }]   
			}
		},

		qunit: {
				files: ['<%=testPath%>**/*.html']
		},

		shell: {
			openTestsInBrowser: {
				command: 'open <%=testPath%>index.html'
			},
			openDemo: {
				command: 'open <%= deployPath %>demo/index.html'
			}
		},

		watch: {
			coffee: {
				files: '<%=coffeeSrcPath%>**/*.coffee',
				tasks: ['lint', 'coffee:dev'],
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
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', ['lint', 'coffee:dev', 'qunit']);
	grunt.registerTask('lint', ['coffeelint']);
	grunt.registerTask('test', ['lint', 'coffee:dev', 'shell:openTestsInBrowser']);
	grunt.registerTask('deploy', ['clean', 'lint', 'coffee:deploy', 'uglify:deploy', 'qunit']);

	grunt.registerTask('demo', ['deploy', 'copy:html', 'shell:openDemo']);
};
