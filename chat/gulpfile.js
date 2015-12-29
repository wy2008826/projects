var gulp=require("gulp");
var gulpRename=require("gulp-rename");

var plugins=require("gulp-load-plugins");
plugins.scss=require("gulp-scss");
plugins.minifyCss=require("gulp-minify-css");
var reactTrans=require("gulp-react");



gulp.task("scss",function(){
	
	gulp.src(["./src/sass/***.scss","!./src/sass/ignore/***"])
	.pipe(plugins.scss())
	// .pipe(plugins.minifyCss())
	.pipe(gulp.dest("./public/css/page"));
});

gulp.task("jsx",function(){
	gulp.src(["./src/jsx/**/*.jsx"])
	.pipe(reactTrans())
	.pipe(gulp.dest("./public/js/page/jsx/"));
});


gulp.task("watch",function(){
	gulp.watch(["src/sass/***.scss"],function(){
		gulp.run("scss");
	});
});

