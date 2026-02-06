import webpackStream from "webpack-stream";

export const jsSwiper = () => {
  return app.gulp.src(app.path.src.jsSwiper, { sourcemaps: true })

    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'swiper.min.js',
      }
    }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
    .pipe(app.gulp.dest("_site/js"))
    .pipe(app.plugins.browsersync.stream());
}
