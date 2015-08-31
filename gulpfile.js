var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
    HTML: ['web/index.html', 'web/signup.html']
    ALL: ['web/js/*.js', 'web/js/**/*.js', 'web/home.html', 'web/signup.html'],
    JS: ['web/js/*.js', 'web/js/**/*.js']
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'web/src',
    DEST_BUILD: 'build',
    DEST: 'dist'
    };

gulp.task('transform', function(){
    gulp.src(path.JS)
        .pipe(react())
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});


gulp.task('watch', function(){
    gulp.watch(path.ALL, ['transform', 'copy']);
});

gulp.task('default', ['watch']);

gulp.task('build', function(){
    gulp.src(path.JS)
        .pipe(react())
        .pipe(concat(path.MINIFIED_OUT))
        .pipe(uglify(path.MINIFIED_OUT))
        .pipe(gulp.dest(path.DEST_BUILD));
});

// Remember use <!-- build:js --> and <!-- endbuild --> for stuff that needs replaced
gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'build/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);





