var gulp =require('gulp');
var sass=require('gulp-sass');
var browserSync=require('browser-sync');
var useref=require('gulp-useref');
var uglify=require('gulp-uglify');
var gulpIf=require('gulp-if');
var minifyCSS=require('gulp-minify-css');
var imageminJpegRecompress=require('imagemin-jpeg-recompress');
var imagemin=require('gulp-imagemin');
var del=require('del');
var runSequence=require('run-sequence');

var cache=require('gulp-cache');
gulp.task("sass",function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream:true
    }))
})
gulp.task("watch",['browserSync','sass'],function(){
    gulp.watch("app/scss/**/*.scss",['sass']);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js',browserSync.reload);
})
gulp.task("browserSync",function(){
    browserSync({
        server:{
            baseDir:'app'
        }
    })
})
gulp.task('useref',function(){
    return gulp.src('app/*.html')
    .pipe(gulpIf('*.css',minifyCSS()))
    .pipe(gulpIf('*.js',uglify()))
    .pipe(useref())
    .pipe(gulp.dest('dist'));
})
gulp.task('images',function(){
    // var jpgmin=imageminJpegRecompress({
    //     accurate: true,//高精度模式
    //     quality: "high",//图像质量:low, medium, high and veryhigh;
    //     method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
    //     min: 70,//最低质量
    //     loops: 0,//循环尝试次数, 默认为6;
    //     progressive: false,//基线优化
    //     subsample: "default"//子采样:default, disable;
    // })
    // gulp.src("app/images/*.*")
    // .pipe(imagemin({
    //     use: [jpgmin]
    // }))
    // .pipe(gulp.dest("dist/img"));
    return gulp.src('app/images/**/*.+(png|jpg)')
    .pipe(cache(imagemin({
        interlaced:true
    })))
    .pipe(gulp.dest('dist/images'))
})
gulp.task('clean',function(callback){
    del('dist');
    return cache.clearAll(callback);
})
gulp.task('build',function(callback){
    runSequence('clean',['sass','useref','images'],callback)
})
gulp.task('default',function(callback){
    runSequence(['sass','browserSync','watch'],callback)
})