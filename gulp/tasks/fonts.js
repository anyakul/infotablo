import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const fonts = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`, {})
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
