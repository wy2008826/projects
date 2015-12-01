var gulp=require("gulp");

var plugins=require("gulp-load-plugins");
var scss=require("gulp-scss");
gulp.task("sass",function(){
	gulp.src(["./src/sass/***.scss","!./src/sass/ignore/***"])
	.pipe(plugins.scss())
	.pipe(gulp.dest("./public/css/"));
});


gulp.task("watch",function(){
	gulp.watch(["src/sass/***.scss"],function(){
		gulp.run("sass");
	})
});