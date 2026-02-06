import dartSass from 'sass';
import guipSass from 'gulp-sass';
import rename from 'gulp-rename';


import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = guipSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: true})
       .pipe(sass({
         outputStyle: 'expanded'
    }))
       .pipe(groupCssMediaQueries())
       .pipe(webpcss({
         webpClass: '.webp',
         noWebpClass: '.no-webp'
       }))
       .pipe(autoprefixer({
         grid: true,
         overrideBrowserslist:["last 3 versions"],
         cascade: true
       }))
       .pipe(app.gulp.dest(app.path.build.css))
       .pipe(cleanCss())
       .pipe(rename({
        extname:".min.css"
       }))
       .pipe(app.gulp.dest(app.path.build.css))
       .pipe(app.gulp.dest("_site/css"))//Пайп для Джекил сахар не используем
       .pipe(app.plugins.browsersync.stream())
}