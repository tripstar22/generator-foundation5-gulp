var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    bowerRoot = 'src/bower-components/';

// sass task
// compile
// compress
// autoprefix
// rename with .min
gulp.task('styles', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
         .pipe(sass({}))
         // add this as option for production for pipe.sass outputStyle: 'compressed'
         // .pipe(autoprefixer('last 2 versions'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

// combine vendor scripts
// uglifies
// rename with .min
// *** NOT IN GULP WATCH ***
// *** HAVE TO RUN 'gulp scriptsVendor' FOR TASK TO WORK ***
gulp.task('scriptsVendor', function() {
    gulp.src(
        [
            bowerRoot + 'jquery/dist/jquery.min.js'
        ],
        {base: 'src/bower-components/'})
        .pipe(plumber())
        // uncomment for production
        //.pipe(uglify())
        .pipe(concat('dist/js/vendor.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(''))
        .pipe(livereload());
});

// custom scripts task
// uglifies
// rename with .min
gulp.task('scriptsCust', function() {
    gulp.src('src/js/*.js')
        .pipe(plumber())
         // uncomment for production
         // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// minify images
gulp.task('images', function() {
    gulp.src('src/img/*.+(png|jpg|gif|svg)')
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
    gulp.watch('src/js/*.js', ['scriptsCust']);
    gulp.watch('src/img/*', ['images']);
});

// gulp runs your tasks
gulp.task('default', [
    'styles',
    'scriptsCust',
    'images',
    'watch'
]);
