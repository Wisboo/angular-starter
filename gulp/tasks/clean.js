var gulp = require('gulp'),
    del = require('del');

var localConfig = {
  buildSrc: './build'
};

gulp.task('clean', function () {
  return del([localConfig.buildSrc]);
});
