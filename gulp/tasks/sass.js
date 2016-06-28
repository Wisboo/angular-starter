var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    scsslint = require('gulp-scss-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    gulpif = require('gulp-if'),
    del = require('del'),
    globalConfig = require('../config');

var localConfig = {
  src: './src/scss/all.scss',
  dest: './build/css/',
  buildFileName: 'all.css',
  cleanSrc: ['./build/css/all.css', '!./build/css/vendor.css']
};

gulp.task('clean:css', function () {
  return del(localConfig.cleanSrc);
});

gulp.task('sass', ['clean:css'], function () {
  return gulp.src(localConfig.src)
    .pipe(plumber({errorHandler: globalConfig.errorHandler}))
    .pipe(gulpif(globalConfig.development(), scsslint({
      'config': 'scss-lint.yml'
    })))
    .pipe(gulpif(globalConfig.development(), scsslint.failReporter('E')))
    .pipe(gulpif(globalConfig.development(), sourcemaps.init()))
      .pipe(sass())
      .pipe(concat(localConfig.buildFileName))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulpif(globalConfig.production() || globalConfig.staging(), cssnano()))
    .pipe(gulpif(globalConfig.development(), sourcemaps.write()))
    .pipe(gulp.dest(localConfig.dest));
});

