/**
*  Welcome to your gulpfile!
*  The gulp tasks are split into several files in the gulp directory
*  because putting it all here was too long
*/

'use strict';

var fs = require('fs');
var gulp = require('gulp');
gulp.paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e'
};

/**
*  This will load all js or coffee files in the gulp directory
*  in order to load all gulp tasks
*/
fs.readdirSync('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});


/**
*  Default task clean temporaries directories and launch the
*  main optimization build task
*/
gulp.task('build', ['clean'], function () {
    gulp.start('buildapp');
});
