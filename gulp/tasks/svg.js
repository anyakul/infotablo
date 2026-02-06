import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';

export const svg = () => {
  return app.gulp.src(app.path.src.svg)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(app.gulp.dest(app.path.build.images));
}
