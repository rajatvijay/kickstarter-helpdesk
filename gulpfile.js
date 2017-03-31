/**
 * Created by rajat on 31/3/17.
 */

var gulp = require('gulp');
var gulpif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglifyJs = require('gulp-uglifyjs');
var uglifyCss = require('gulp-uglifycss');
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var args = require('yargs').argv;


// Making it scalable to accomodate more apps later
var apps = {
  kickStarter: {
    buildDirectory: 'public/kickStarter',
    html: ['app/kickStarter/**/*.html'],
    js: ['app/index.js', 'app/shared/**/*.js', 'app/kickStarter-templates.js', 'app/kickStarter/**/*.js'],
    scss: ['app/kickStarter/**/*.scss'],
    css: [],
    externals: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      // 'bower_components/ui-select/dist/select.js',
      'bower_components/angular-material/angular-material.js',
      // 'bower_components/angular-messages/angular-messages.js',
      // 'bower_components/angular-sanitize/angular-sanitize.js',
      // 'bower_components/ngSmoothScroll/lib/angular-smooth-scroll.js',
      'bower_components/angular-loading-bar/build/loading-bar.js'
      // 'vendor/infinite-scroll.js',
      // 'bower_components/angular-carousel/dist/angular-carousel.js',
      // 'bower_components/angular-touch/angular-touch.js',
      // 'bower_components/intro.js/minified/intro.min.js',
      // 'bower_components/angular-intro.js/build/angular-intro.min.js'
    ],

    externalCss: [
      'bower_components/angular-loading-bar/build/loading-bar.css',
      // 'vendor/material-icons.css',
      // 'bower_components/angular-chart.js/dist/angular-chart.css',
      'bower_components/angular-material/angular-material.css'
      // 'bower_components/angular-carousel/dist/angular-carousel.css',
      // 'bower_components/intro.js/minified/introjs.min.css'
    ]
  }
};

// Utilities
var getAppName = function () {
  return args.appName !== undefined ? args.appName : 'kickStarter' ;
} ;

var getAppDirectory = function () {
  return apps[getAppName()].buildDirectory ;
} ;

var getAppSourceDirectory = function () {
  return apps[getAppName()].html ;
} ;

var baseFunction = function(_file){

  var sharedFile = 'shared' ;

  var _path = _file.path ;

  if(_path.search(sharedFile) > -1)
    return _path.split("tmpl/")[1] || _path.split("tmpl\\")[1] ;
  else
    return _path.split("kickstarter-helpdesk/app")[1] || _path.split("kickstarter-helpdesk\\app")[1] ;
} ;

var getAppTemplateName = function () {
  return {
    'kickStarter': 'kickStarter-templates.js'
  }[getAppName()] ;
} ;

var getPort = function () {
  return args.port !== undefined ? args.port : 3030 ;
} ;

var getEnv = function () {
  return args.env !== undefined ? args.env : 'PRODUCTION' ;
};

var getAppjsSource = function () {
  return ['app/index.js'].concat(apps[getAppName()].js) ;
} ;

var getAppStylingSource = function () {
  return apps[getAppName()].css ;
} ;

// Gulp tasks

gulp.task('clean', function () {

  var appDirectory = getAppDirectory() ;
  console.log('CLEANING: ', appDirectory);
  rimraf( appDirectory + '/**/*.*', function () {});

});

gulp.task('externals', function () {

  //console.log(apps[getAppName()].externals);
  var appDirectory = getAppDirectory() ;
  gulp.src(apps[getAppName()].externals)
    .pipe(concat('externals.js'))
    .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyJs()))
    .pipe(gulp.dest(appDirectory + '/js'));


  gulp.src(apps[getAppName()].externalCss)
    .pipe(concat('externals.css'))
    .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyCss()))
    .pipe(gulp.dest(appDirectory + '/css'));
});

gulp.task('templates', function () {


  gulp.src(getAppSourceDirectory())
    .pipe(minifyHTML({
      conditionals: true
    }))
    .pipe(
      templateCache(
        {
          module: 'app',
          root: '/',
          base: baseFunction,
          filename: getAppTemplateName()
        })
    )
    .pipe(gulp.dest('app'));

});

gulp.task('app', function () {
  runSequence(
    'templates',
    function () {
      gulp.src(getAppjsSource())
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyJs()))
        .on('error', function (e) {
          this.emit('end');
        })
        .pipe(sourcemaps.write({dest: getAppDirectory() + '/js'}))
        .pipe(gulp.dest(getAppDirectory() + '/js'))
    }
  );

    var cssStream = gulp.src(getAppStylingSource())
      .pipe(stylus({
        'include css': true
      }));


    var scssStream = gulp.src(apps[getAppName()].scss)
      .pipe(concat('app.scss'))
      .pipe(sass().on('error', sass.logError));

    merge(scssStream, cssStream)
      .pipe(concat('app.css'))
      .pipe(gulpif((getEnv() === 'PRODUCTION'),uglifyCss()))
      .pipe(gulp.dest(getAppDirectory() + '/css'))
    ; //.pipe(browserSync.reload({stream: true}));

    gulp.src('app/index.html').pipe(gulp.dest(getAppDirectory()));

});

gulp.task('serve', function () {
  var appDirectory = getAppDirectory() ;
  var port = getPort() ;

  gulp.src(appDirectory)
    .pipe(webserver({
      port: port,
      fallback: 'index.html'
    }));
});

gulp.task('build', function () {

  runSequence(
    'clean', 'externals', 'app'
  ) ;

});

gulp.task('watch', ['build'], function () {
  gulp.watch('app/**/*.*', ['app']) ;
});
