var gulp = require('gulp');

var browserify = require('browserify'); //joineed together via require statements
var reactify = require('reactify'); //takes html element and transforms it into longhand javascript document.body.innetHtml etc.?
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

var paths = {
    app: ['./src/app.jsx'],
    js: ['./src/**/*.*'],
};

gulp.task('browserify', function() {
    // Browserify/bundle the JS.
    browserify(paths.app)
        .transform(reactify)
        .bundle() //make sure browserify and reactify finish doing what they are doing
        .pipe(source('bundle.js')) //.pipe is node thing. put pipe on a data source to format the data like array.map(). pip is stationary and data fed through it
        //create bundle.js and add the data to it and this will be a normal js file.
        .pipe(gulp.dest('./build/')) //gulp.dest once got bundle.js put it in the build folder
        .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    livereload: true,
    port: 8080
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['browserify']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['connect', 'watch', 'browserify']);