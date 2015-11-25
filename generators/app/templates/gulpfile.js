var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

// sass task
// compile
// compress
// autoprefix
// rename with .min
gulp.task('styles', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

// custom scripts task
// uglifies
// rename with .min
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// minify images
gulp.task('images', function() {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// watch tasks
// live reload
// watch scss
// watch js
gulp.task('watch', function() {

    // live reload
    var server = livereload({ start: true });

    // watch these tasks
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/img/*', ['images']);
});

// gulp runs all your tasks
gulp.task('default', [
    'styles',
    'scripts',
    'images',
    'watch'
]);
