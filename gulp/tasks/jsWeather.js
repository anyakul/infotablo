export const jsWeather = () => {
  return app.gulp.src(app.path.src.jsWeather)
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
    .pipe(app.gulp.dest("_site/js"))
}
