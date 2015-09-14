var gulp = require('gulp');
var minifier = require('gulp-uglify/minifier');
var uglifyjs = require('uglify-js');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var htmlreplace = require('gulp-html-replace');
var gutil = require('gulp-util');
var _ = require('lodash');

var path = {
    HTML: ['index.html', 'home.html','signup.html'],
    FINAL_HTML: '../templates',
    ALL: ['js/*.js', 'js/**/*.js', 'home.html', 'signup.html'],
    REACT_JS: ['js/*.js', 'js/components/*.js'],
    JS_LIB: ['js/lib/*.js'],
    CSS: ['css/*'],
    IMG: ['img/*'],
    OUT: 'build.js',
    MINIFIED_OUT: 'build.min.js',
    DEST_BUILD: 'public/static',
    DEST_BUILD_JS: 'public/static/js',
    DEST_FINAL_JS: '../static/js',
    DEST_BUILD_CSS: 'public/static/css',
    DEST_FINAL_CSS: '../static/css',
    DEST_BUILD_IMG: 'public/static/img',
    DEST_FINAL_IMG: '../static/img',
    DEST: 'public',
    ENTRIES: ['js/home.js', 'js/signup.js']
    };


gulp.task('copy', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('copy-prod', function(){
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.FINAL_HTML));
});

gulp.task('css', function(){
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST_BUILD_CSS));
});

gulp.task('css-prod', function(){
    gulp.src(path.CSS)
        .pipe(gulp.dest(path.DEST_FINAL_CSS));
});

gulp.task('img', function() {
    gulp.src(path.IMG)
        .pipe(gulp.dest(path.DEST_BUILD_IMG));
});

gulp.task('img-prod', function() {
    gulp.src(path.IMG)
        .pipe(gulp.dest(path.DEST_FINAL_IMG));
});

gulp.task('js', function() {
    gulp.src(path.JS_LIB)
        .pipe(gulp.dest(path.DEST_BUILD_JS));
});

gulp.task('js-prod', function() {
    gulp.src(path.JS_LIB)
        .pipe(gulp.dest(path.DEST_FINAL_JS));
});

gulp.task('watch', function(){
    gulp.watch(path.HTML, ['copy']);
    gulp.watch(path.JS_LIB, ['js']);
    gulp.watch(path.CSS, ['css']);

    _.each(path.ENTRIES, function(page) {

        var watcher = watchify(browserify({
            entries: [page],
            transform: [reactify],
            debug: true,
            cache: {}, packageCache: {}, fullPaths: true
        }));

        return watcher.on('update', function(){
            watcher.bundle()
                .pipe(source(page.split('/')[1].split('.')[0] + path.OUT))
                .pipe(gulp.dest(path.DEST_BUILD_JS));
                console.log('Updated');
            })
            .bundle()
            .pipe(source(page.split('/')[1].split('.')[0] + path.OUT))
            .pipe(gulp.dest(path.DEST_BUILD_JS));
        });
});

gulp.task('default', [ 'img', 'copy', 'css', 'js', 'watch']);

gulp.task('build', function(){
    _.each(path.ENTRIES, function(page) {
        browserify({
            entries: [page],
            transform: [reactify]
        })
        .bundle()
        .pipe(source(page.split('/')[1].split('.')[0] + path.MINIFIED_OUT))
        .pipe(streamify(minifier({}, uglifyjs)))
        .pipe(gulp.dest(path.DEST_FINAL_JS));
    });
});


// Remember use <!-- build:js --> and <!-- endbuild --> for stuff that needs replaced
gulp.task('replaceHTML', function(){
    _.each(path.HTML, function(page) {
        gulp.src(page)
            .pipe(htmlreplace({
                'js': 'static/js/' + page.split('.')[0] + path.MINIFIED_OUT
            }))
            .pipe(gulp.dest(path.FINAL_HTML));
    })
});

gulp.task('production', ['replaceHTML', 'build', 'css-prod', 'js-prod', 'img-prod']);
