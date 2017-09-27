var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext'); 
var precss = require('precss');

var paths = {
  sass: ['./scss/**/*.scss'],
  templatecache: ['./www/templates/**/*.html'],
  ng_annotate: ['./www/js/*.js'],
  useref: ['./www/*.html']
};

gulp.task('default', ['sass', 'css','templatecache','ng_annotate','ng_annotate1','useref']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('templatecache', function (done) {
  gulp.src('./www/templates/**/*.html')
    .pipe(templateCache({standalone:true, root: "templates"}))
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});

gulp.task('ng_annotate', function (done) {
  gulp.src('./www/js/*.js')
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(gulp.dest('./www/dist/dist_js/app'))
    .on('end', done);
});
gulp.task('ng_annotate1', function (done) {
  gulp.src('./www/templates/**/*.js')
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(gulp.dest('./www/dist/dist_js/app'))
    .on('end', done);
});
gulp.task('useref', ['ng_annotate','ng_annotate1'], function (done) {
  var assets = useref.assets();
  gulp.src('./www/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('./www/dist'))
    .on('end', done);
});

gulp.task('css', function () { 
  var processors = [autoprefixer({browsers: ['last 1 version']}), cssnext, precss]; 
  return gulp.src('./www/css/ionic.css') 
        .pipe(postcss(processors)) 
        .pipe(gulp.dest('./www/dist/dist_css')); 
})

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.templatecache, ['templatecache']);
  gulp.watch(paths.ng_annotate, ['ng_annotate']);
  gulp.watch(paths.useref, ['useref']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
