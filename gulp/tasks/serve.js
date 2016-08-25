var browserSync = require('browser-sync'),
    gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback');

var localConfig = {
  buildSrc: './build/',
  fallbackFile: './build/index.html',
  appFiles: './build/**/*.*',
  defaultPort: 8001
};

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: localConfig.buildSrc
        },
        files: localConfig.appFiles,
        reloadDelay: 1000,
        open: false,
        port: localConfig.defaultPort,
        middleware: [ historyApiFallback() ] // To allow ui-router html5mode
    });
});

gulp.task('serve:static', function() {
  connect.server({
    root: localConfig.buildSrc,
    port: process.env.PORT || localConfig.defaultPort,
    fallback: localConfig.fallbackFile // To allow ui-router html5mode
  });
});
