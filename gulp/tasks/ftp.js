import { configFTP } from '../config/ftp.js';
import vinylFTP from "vinyl-ftp"
import util from 'gulp-util';

export const  ftpLoad =  () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP)
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(ftpConnect.dest(`${app.path.ftp}`))
}