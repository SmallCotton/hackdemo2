module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '',
        clean: {
            options: {
                force: true
            },
            build:['build']
        },
        uglify : {
            bar: {
                options: {
                    banner: '/*! <%= pkg.cherry %>*/',
                    footer:'/*! ~~~~end~~~~ */'
                }
            },
            build : {
                files: [{
                    expand : true,
                    cwd : 'src/',
                    src : ['**/js/*.js'],
                    dest : 'build/'
                }]
            }
        },
        cssmin : {
            options: {
                compatibility: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src:['**/css/*.css'],
                    dest: 'build/'
                }]
            }
        },
        imagemin : {
            options: {                     
                optimizationLevel: 7
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src:['**/img/**/*.{png,jpg,jpeg}', '**/img/*.{png,jpg,jpeg}'],
                    dest: 'build/'
                }]
            }
        },
        jshint : {
            options:{
                boss: false,
                undef: true,
                eqeqeq: false,
                asi: true,
                expr: true
            },
            check:{
                src:['src/**/js/main.js']
            }
        },
        copy : {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'build/'
                }]
            }
        },
        connect : {
            server : {
                options : {
                    port: process.env.PORT || 1337,
                    keepalive : true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
 
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['clean', 'copy', 'cssmin', 'uglify']);
};