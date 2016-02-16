const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');

gulp.task('compile', function () {
  return gulp.src(['src/main.coffee', 'src/**/*.coffee'])
    .pipe($.coffee({bare: false}, {sourceMap: false}).on('error', $.util.log))
    .pipe($.ngAnnotate())
    .pipe($.concat('index.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['compile', 'copy']);
gulp.task('default', ['build']);
