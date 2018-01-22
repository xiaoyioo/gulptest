gulp.task('build',function(callback){
    runSequence('clean',['sass','useref','images'],callback)
})
gulp.task('default',function(callback){
    runSequence(['sass','browserSync','watch'],callback)
})
参考地址：https://www.cnblogs.com/sxz2008/p/6370221.html
https://www.cnblogs.com/Darren_code/p/gulp.html

less转css:
http://www.ydcss.com/archives/34
