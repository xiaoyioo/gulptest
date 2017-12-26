gulp.task('build',function(callback){
    runSequence('clean',['sass','useref','images'],callback)
})
gulp.task('default',function(callback){
    runSequence(['sass','browserSync','watch'],callback)
})
