module.exports = function (grunt) {
	grunt.initConfig({
		generatedJSPath: 'src/js/',
		coffeeSrcPath: 'src/coffee/',
		coffeeTokenizedSrcPath: 'src/coffee/tokens/',
		externalJSPath: 'src/libs/',
		htmlPath: 'src/html/',
		deployPath: 'lib/',
		testPath: 'test/',
		demoPath: 'demo/',
		pkg: grunt.file.readJSON('package.json'),

		coffeeFiles: [{
			expand: true,
			cwd: '<%=coffeeTokenizedSrcPath%>',
			src: '**/*.coffee',
			dest: '<%=generatedJSPath%>',
			ext: '.js'
		}],


		clean: {
			dev: ["<%=deployPath%>", "<%=generatedJSPath%>"],
			tokens: ["<%=coffeeTokenizedSrcPath%>"]
		},
		coffee: {
			dev: {
				options: {
					sourceMap: true,
					bare: true
				},
				files: '<%= coffeeFiles %>'
			},

			deploy: {
				options: {
					sourceMap: false,
					bare: true
				},
				files: '<%= coffeeFiles %>'
			}
		},

		jshint: {
			all: ['<%=generatedJSPath%>']
		},

		coffeelint: {
			options: {
				"max_line_length": {
					'value': 120
				},
				"no_trailing_whitespace": {
					'level': 'warn'
				}
			},
			all: ['<%=coffeeTokenizedSrcPath%>*.coffee']
		},

		uglify: {
			deploy: {
				files: [{
					expand: true, // Enable dynamic expansion.
					cwd: '<%=generatedJSPath%>', // Src matches are relative to this path.
					src: ['**/*.js'], // Actual pattern(s) to match.
					dest: '<%=deployPath%>/', // Destination path prefix.
					ext: '.min.js', // Dest filepaths will have this extension.
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

		replace: {
			version: {
				src: ['<%=coffeeSrcPath%>**/*.coffee'],
				dest: "<%=coffeeTokenizedSrcPath%>",
				replacements: [{
					from: "%version%",
					to: "<%=pkg.version%>"
				}]
			}
		},

		open: {
			test: {
				path: '<%=testPath%>/index.html',
				app: 'Google Chrome'
			},
			demo: {
				path: '<%=demoPath%>/index.html',
				app: 'Google Chrome'
			}
		},

		watch: {
			coffee: {
				files: '<%=coffeeSrcPath%>**/*.coffee',
				tasks: ['dev']
			},
			deploy: {
				files: '<%=coffeeSrcPath%>**/*.coffee',
				tasks: ['deploy'],
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
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('default', ['dev']);
	grunt.registerTask('dev', ['tokenize', 'lint', 'coffee:dev', 'clean:tokens', 'qunit']);
	grunt.registerTask('tokenize', ['clean:tokens', 'replace:version']);
	grunt.registerTask('lint', ['coffeelint']);
	grunt.registerTask('test', ['dev', 'open:test']);
	grunt.registerTask('demo', ['deploy', 'open:demo']);
	grunt.registerTask('deploy', ['clean', 'tokenize', 'lint', 'coffee:deploy', 'uglify:deploy', 'copy:deploy', 'clean:tokens', 'qunit']);
};
