const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const shorthand = require('gulp-shorthand')
const autoprefixer = require('gulp-autoprefixer')
const gulpStylelint = require('gulp-stylelint')
const rename = require("gulp-rename")

module.exports = function styles() {
    return gulp.src('src/styles/*.scss')
        .pipe(plumber())
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                {
                    formatter: 'string',
                    console: true
                }
            ]
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/css'))
}