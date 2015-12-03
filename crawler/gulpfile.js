var gulp=require("gulp");
var gulpRename=require("gulp-rename");

var plugins=require("gulp-load-plugins");
plugins.scss=require("gulp-scss");
plugins.minifyCss=require("gulp-minify-css");



gulp.task("scss",function(){
	
	gulp.src(["./src/sass/***/*.scss","!./src/sass/ignore/***"])
	.pipe(plugins.scss())
	.pipe(plugins.minifyCss())
	.pipe(gulp.dest("./public/css/"));
});


gulp.task("watch",function(){
	gulp.watch(["src/sass/***.scss"],function(){
		gulp.run("scss");
	})
});

