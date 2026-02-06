import webpackStream from "webpack-stream";

export const jsScheduler = () => {
  return app.gulp.src(app.path.src.jsScheduler, { sourcemaps: true })

    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'scheduler.js',
      }
    }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
    .pipe(app.gulp.dest("_site/js"))
    .pipe(app.plugins.browsersync.stream());
}
