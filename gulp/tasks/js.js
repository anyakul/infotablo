import webpackStream from "webpack-stream";

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: true })

    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'main.min.js',
      }
    }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
    .pipe(app.gulp.dest("_site/js"))
    .pipe(app.plugins.browsersync.stream());
}
