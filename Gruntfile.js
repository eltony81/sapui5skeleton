(function () {
    "use strict";

    module.exports = function (grunt) {

        grunt.initConfig({

            ui5: {
                version: '1.34.9'
            },

            dir: {
                webapp: 'app',
                dist: 'WebContent',
                bower_components: 'bower_components'
            },

            jshint: {
                all: ['Gruntfile.js', '<%= dir.webapp %>/**/*.js'],
                options: {
                    jshintrc: '.jshintrc',
                    jshintignore: '.jshintignore'
                }
            },

            jsvalidate: {
                options: {
                    globals: {},
                    esprimaOptions: {},
                    verbose: false
                },
                targetName: {
                    files: {
                        src: ['<%=jshint.all%>']
                    }
                }
            },

            connect: {
                options: {
                    port: 9876,
                    hostname: '*'
                },
                src: {},
                dist: {}
            },

            openui5_connect: {
                options: {
                    resources: [
                        '<%= dir.bower_components %>/openui5-sap.ui.core/resources',
                        '<%= dir.bower_components %>/openui5-sap.m/resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.commons/resources',
                        '<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.unified/resources',
                        '<%= dir.bower_components %>/openui5-sap.ui.table/resources'
                    ]
                },
                src: {
                    options: {
                        appresources: '<%= dir.webapp %>'
                    }
                },
                dist: {
                    options: {
                        appresources: '<%= dir.dist %>'
                    }
                }
            },

            openui5_preload: {
                component: {
                    options: {
                        resources: {
                            cwd: '<%= dir.webapp %>',
                            prefix: 'myapp'
                        },
                        dest: '<%= dir.dist %>'
                    },
                    components: true
                }
            },

            clean: {
                dist: {
                    src: ['<%= dir.dist %>/**']
                }
            },

            copy: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= dir.webapp %>',
                        src: [
                            '**',
                            '!test/**',
                            '!META-INF/**',
                            '!WEB-INF/**',
                            '!.idea/**',
                            '!index_test.html'
                        ],
                        dest: '<%= dir.dist %>'
                    }, {
                        expand: true,
                        cwd: './',
                        src: [
                            '.Ui5RepositoryIgnore'
                        ],
                        dest: '<%= dir.dist %>'
                    }, {
                        expand: true,
                        cwd: '<%= dir.bower_components %>/accounting.js',
                        src: 'accounting.min.js',
                        dest: '<%= dir.dist %>/ext_lib/'
                    }, {
                        expand: true,
                        cwd: '<%= dir.bower_components %>/sprintf/dist',
                        src: 'sprintf.min.js',
                        dest: '<%= dir.dist %>/ext_lib/'
                    }
                    ]
                }
            },

            eslint: {
                webapp: ['<%= dir.webapp %>']
            },

            'string-replace': {
                inline: {
                    files: {
                        '<%= dir.dist %>/index.html': '<%= dir.dist %>/index.html'
                    },
                    options: {
                        replacements: [
                            {
                                pattern: 'src=\"resources/sap-ui-core.js\"',
                                replacement: 'src=\"resources/sap-ui-core.js\"',
                            }
                        ]
                    }
                }
            },

            watch: {
                files: ['Gruntfile.js', '<%= dir.webapp %>/**/*.js', '<%= dir.webapp %>/**/*.xml', '<%= dir.webapp %>/**/*.html', '<%= dir.webapp %>/**/*.css', '<%= dir.webapp %>/**/*.json', '<%= dir.webapp %>/**/*.properties'],
                tasks: ['build', 'copy:dist'],
                options: {
                    livereload: true
                }
            }

        });

        // These plugins provide necessary tasks.
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-jsvalidate');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-openui5');
        grunt.loadNpmTasks('grunt-eslint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-string-replace');

        // Server task
        grunt.registerTask('serve', function (target) {
            grunt.task.run('openui5_connect:' + (target || 'src') + '');
        });

        // Compile task
        grunt.registerTask('compile', ['jsvalidate', 'jshint', 'eslint']);

        // JSHint task
        grunt.registerTask('hint', ['jshint']);

        // Linting task
        grunt.registerTask('lint', ['eslint']);

        // Build task
        //grunt.registerTask('build', ['compile', 'openui5_preload', 'copy:dist', 'string-replace']);
        grunt.registerTask('build', ['compile', 'copy:dist']);

        // Watch task
        grunt.registerTask('mywatch', ['watch']);

        // Default task
        grunt.registerTask('default', [
            'build',
            'serve:dist',
            'watch'
        ]);
    };

}
());
