var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
    HTML: 'web/home.html',
    ALL: ['web/js/*.js', 'web/js/**/*.js', 'web/home.html'],
    JS: ['web/js/*.js', 'web/js/**/*.js']
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 

