export const jsFlatpickru = () => {
  return app.gulp.src(app.path.src.jsFlatpickru)
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
    .pipe(app.gulp.dest("_site/js"))
}
