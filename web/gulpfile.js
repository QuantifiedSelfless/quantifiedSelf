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

var path = {
    HTML: ['index.html', 'home.html','signup.html'],
    FINAL_HTML: '../templates',
    ALL: ['js/*.js', 'js/**/*.js', 'home.html', 'signup.html'],
    JS: ['js/*.js', 'js/**/*.js'],
    CSS: ['css/*'],
    OUT: 'build.js',
    MINIFIED_OUT: 'build.min.js',
    DEST_BUILD: 'public/static',
    DEST_BUILD_JS: 'public/static/js',
    DEST_FINAL_JS: '../static/js',
    DEST_BUILD_CSS: 'public/static/css',
    DEST_FINAL_CSS: '../static/css',
    DEST: 'public',
    ENTRY_POINT: 'js/app.js'
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

gulp.task('watch', function(){
    gulp.watch(path.HTML, ['copy']);

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function(){
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_BUILD_JS));
            console.log('Updated');
        })
          .bundle()
          .pipe(source(path.OUT))
          .pipe(gulp.dest(path.DEST_BUILD_JS));
});

gulp.task('default', ['watch', 'css']);

gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify]
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(minifier({}, uglifyjs)))
    .pipe(gulp.dest(path.DEST_FINAL_JS));
});


// Remember use <!-- build:js --> and <!-- endbuild --> for stuff that needs replaced
gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'static/js/' + path.MINIFIED_OUT
        }))
        .pipe(gulp.dest(path.FINAL_HTML));
});

gulp.task('production', ['replaceHTML', 'build', 'css-prod']);
