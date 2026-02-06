import gulp from "gulp";
import { plugins } from "./gulp/config/plugins.js";

import { path } from "./gulp/config/path.js";

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
}

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { jsSwiper } from "./gulp/tasks/jsSwiper.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { svg } from "./gulp/tasks/svg.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftpLoad } from "./gulp/tasks/ftp.js";
import { jsFlatpicr } from "./gulp/tasks/jsFlatpicr.js";

function watcher() {
  gulp.watch(path.watch.html, copy)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.images, images)
  gulp.watch(path.watch.images, svg)
  gulp.watch(path.watch.sprite, svg)
}

const mainTasks = gulp.parallel(copy, scss, jsSwiper, jsFlatpicr, js, images, svg, fonts, zip)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

gulp.task('default', dev);
const start = gulp.series(dev)
const ftp = gulp.series(reset, mainTasks, ftpLoad)
export { start }
export { ftp }
