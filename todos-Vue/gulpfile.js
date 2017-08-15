const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const reload = browserSync.reload;

gulp.task("js",function(){
    gulp.src("./src/com/*.js")
        .pipe(babel({
            presets:['env']
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream:true}))
})

gulp.task('sass',function(){
    return gulp.src('./src/sass/*.scss')
               .pipe(sass({
                    outputStyle:'expanded'
               }).on('error',sass.logError))
               .pipe(gulp.dest('./dist/css'))
               .pipe(reload({stream:true}))
})

gulp.task("default",function(){
    browserSync.init({
        server:{
            baseDir:'./'
        },
        port:'1222'
    });
    gulp.watch("./src/com/*.js",["js"]);
    gulp.watch("./src/sass/*.scss",["sass"]);
    gulp.watch('./*.html').on('change',reload);
})