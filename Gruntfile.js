//"wrapper function"
module.exports = function(grunt) {
  //Project configuration
  //Configures all tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //appends static files into one large file
    concat: {
      options: {
        separator: ';'
      }, 
      dist: {
        src: ['public/lib/**/*.js',
              'public/client/**/*.js'],
        //template useful so name change is easy
        //name file same name as application - best practice
        //so now files will be in a dist directory in public folder
        //that file will be called shortly-express.js
        //since these are client files - the app is basically shortly-express
        dest: 'public/dist/<%= pkg.name %>.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    //transforms code into unreadable form to hide original intent
    //uglifying our massive client file
    uglify: {
      js: {
        src: ['public/dist/<%= pkg.name %>.js'],
        dest: 'public/dist/<%= pkg.name %>.js'
      }
    },

    jshint: {
      files: [
        'app/**/*.js', 'lib/**/*.js', 'public/**/*.js', 'server.js'
        // Add filespec list here
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        //ignoring libraries, and our uglified mess
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },
    //compresses css files
    cssmin: {
      files: {
        'public/output.css': ['public/*.css']
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master'
      }
    },
  });

  //Loads tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  //Custom task
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
/*

grunt.registerMultiTask('log', 'Log stuff.', function() {
  grunt.log.writeln(this.target + ': ' + this.data);
});



*/
  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    //concat
    //uglify
    //cssmin
    //test - exit if fail
    //jshint - exit if fail
  ]);

  //grunt upload --prod --> would return true and production server tasks
  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      //when you're ready to push up to the production server
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  //grunt deploy
  grunt.registerTask('deploy', [
    // add your deploy tasks here
    //to build and host your app on a local dev server
  ]);


};
