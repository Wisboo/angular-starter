var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    gulpif = require('gulp-if'),
    del = require('del'),
    globalConfig = require('../config');

var localConfig = {
  vendorJsDeclarationsFile: '../../vendorJs',
  vendorJsCompiledFileName: 'vendor.js',
  buildJsSrc: './build/js/vendor/',
  cleanJsSrc: './build/js/vendor/**/*',
  jsVendorFiles: function () {
    // We always want to load the fresh contents of vendorJs file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorJsDeclarationsFile)];
    return require(this.vendorJsDeclarationsFile).map(function (filepath) {
      return 'bower_components/' + filepath;
    });
  },
  vendorCssDeclarationsFile: '../../vendorCss',
  vendorCssCompiledFileName: 'vendor.css',
  buildCssSrc: './build/css/',
  cleanCssSrc: './build/css/vendor.css',
  cssVendorFiles: function () {
    // We always want to load the fresh contents of vendorCss file, so avoid caching it.
    delete require.cache[require.resolve(this.vendorCssDeclarationsFile)];
    return require('../../vendorCss').map(function (filepath) {
      return 'bower_components/' + filepath;
    });
  }
};

gulp.task('clean:vendor:js', function() {
  return del([localConfig.cleanJsSrc]);
});

gulp.task('vendor:js', ['clean:vendor:js'], function() {
  return gulp.src(localConfig.jsVendorFiles())
    .pipe(gulpif(globalConfig.production() || globalConfig.staging(), concat(localConfig.vendorJsCompiledFileName)))
    .pipe(gulpif(globalConfig.production() || globalConfig.staging(), uglify()))
  .pipe(gulp.dest(localConfig.buildJsSrc));
});

gulp.task('clean:vendor:css', function() {
  return del([localConfig.cleanCssSrc]);
});

gulp.task('vendor:css', ['clean:vendor:css'], function() {
  return gulp.src(localConfig.cssVendorFiles())
    .pipe(concat(localConfig.vendorCssCompiledFileName))
    .pipe(gulpif(globalConfig.production() || globalConfig.staging(), cssnano()))
  .pipe(gulp.dest(localConfig.buildCssSrc));
});

gulp.task('vendor', ['vendor:js', 'vendor:css']);
