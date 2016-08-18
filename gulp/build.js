'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
    return gulp.src([
        paths.src + '/app/**/*.html',
        paths.tmp + '/app/**/*.html'
    ])
    .pipe(
        $.if(function (file) {
            return $.match(file, ['!**/pages/*.html']);
        },
        $.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
    )
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'app',
        root: 'app'
    }))
    .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', {read: false});
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp + '/partials',
        addRootSlash: false
    };

    var htmlFilter = $.filter(['*.html', '!/src/app/elements/pages/*.html'], { restore: true });
    var jsFilter = $.filter('**/*.js', { restore: true });
    var cssFilter = $.filter('**/*.css', { restore: true });

    return gulp.src(paths.tmp + '/serve/*.html')
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe($.useref({
        transformPath: function (filePath) {
            console.log(filePath);
            return filePath.replace('/bower_components', '')
        }
    }))
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense }))
        .on('error', conf.errorHandler('Uglify'))
    .pipe($.rev())
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    // .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
    .pipe($.cssnano())
    .pipe($.rev())
    // .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
        removeEmptyAttributes: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(paths.dist + '/'))
    .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('images', function () {
    return gulp.src(paths.src + '/assets/images/**/*')
        .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

// fix to hard copy fonts from Bootstrap as they don't include their fonts in their bower.json file
gulp.task('copy-bs-fonts', function () {
    return gulp.src('bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(paths.dist + '/fonts/'));
});


gulp.task('fonts', function () {
    gulp.src('bower_components/bootstrap/fonts/*')
        .pipe(gulp.dest(paths.dist + '/fonts/'));

    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist + '/fonts/'))
        .pipe($.size());
});
/*gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**!/!*.{eot,otf,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist + '/fonts/'));
});*/

gulp.task('customFonts', function () {
    return gulp.src(paths.src + '/assets/fonts/*')
        .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist + '/assets/fonts/'));
});

gulp.task('translations', function () {
    return gulp.src('src/**/language/*.json')
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size());
});

gulp.task('data', function () {
    return gulp.src('src/**/data/*.json')
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size());
});

gulp.task('pagesjs', function () {
    return gulp.src('src/**/pages/*.{js,scss}')
        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size());
});

gulp.task('misc', function () {
    return gulp.src(paths.src + '/favicon.png')
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('faviconIco', function () {
    return gulp.src(paths.src + '/favicon.ico')
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('groupCode', function () {
    return gulp.src(paths.src + '/GroupCode.json')
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('clean', function () {
    return $.del([path.join(paths.dist, '/'), path.join(paths.tmp, '/')]);
});

gulp.task('buildapp', [
    'html',
    'images',
    'fonts',
    'customFonts',
    'translations',
    'misc',
    'data',
    'pagesjs',
    'faviconIco',
    'groupCode'
]);
