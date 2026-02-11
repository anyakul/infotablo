export const jsFlatpickr = () => {
  return app.gulp.src(app.path.src.jsFlatpickr)
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
    .pipe(app.gulp.dest("_site/js"))
}
