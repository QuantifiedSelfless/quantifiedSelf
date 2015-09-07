var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var gutil = require('gulp-util');

var path = {
    HTML: ['index.html', 'signup.html'],
    ALL: ['js/*.js', 'js/**/*.js', 'home.html', 'signup.html'],
    JS: ['js/*.js', 'js/**/*.js'],
    CSS: ['css/*.css'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'public/src',
    DEST_BUILD: 'public/static',
    DEST_BUILD_JS: 'public/static/js',
    DEST_BUILD_CSS: 'public/static/css',
    DEST: 'public'
    };

gulp.task('transform', function(){
    gulp.src(path.JS)
        .pipe(react().on('error', gutil.log))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('css', function(){
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST_BUILD_CSS));
});


gulp.task('watch', function(){
    gulp.watch(path.ALL, ['transform', 'copy', 'css']);
});

gulp.task('default', ['watch']);

gulp.task('build', function(){
    gulp.src(path.JS)
        .pipe(react())
        .pipe(uglify())
        .pipe(concat(path.MINIFIED_OUT))
        .pipe(gulp.dest(path.DEST_BUILD_JS));
});

// Remember use <!-- build:js --> and <!-- endbuild --> for stuff that needs replaced
gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'static/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build', 'css']);

