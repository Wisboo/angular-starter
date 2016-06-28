var gulp = require('gulp'),
  del = require('del');

var localConfig = {
  src: [
    './bower_components/bootstrap/fonts/*.*',
    './bower_components/google-open-sans/**/!(*.js|*.map|*.json|LICENSE|*.md)',
    './bower_components/montserrat-webfont/fonts/**/*.*',
    './bower_components/components-font-awesome/fonts/*.*'
  ],
  base: 'src',
  dest: './build/fonts',
  cleanSrc: './build/fonts'
};

gulp.task('clean:fonts', function () {
  return del([localConfig.cleanSrc]);
});

gulp.task('fonts', ['clean:fonts'], function() {
  return gulp.src(localConfig.src)
    .pipe(gulp.dest(localConfig.dest));
});
