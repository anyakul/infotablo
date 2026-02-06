import webpHtmlNosvg from "gulp-webp-html-nosvg"

export const copy = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(webpHtmlNosvg())
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
}
