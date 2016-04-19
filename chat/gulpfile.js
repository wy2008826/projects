var gulp=require("gulp");
var gulpRename=require("gulp-rename");

var plugins=require("gulp-load-plugins");
plugins.scss=require("gulp-scss");
plugins.minifyCss=require("gulp-minify-css");
var uglify=require("gulp-uglify");
var rename=require("gulp-rename");
var reactTrans=require("gulp-react");



gulp.task("scss",function(){
	
	gulp.src(["./src/sass/***.scss","!./src/sass/ignore/***"])
	.pipe(plugins.scss())
	.pipe(plugins.minifyCss())
	.pipe(gulpRename(function(path){
		path.extname=".min.css";//扩展名
	}))
	.pipe(gulp.dest("./public/css/page"));
});

gulp.task("jsx",function(){
	gulp.src(["src/jsx/**/*.jsx"])
	.pipe(reactTrans())
	.pipe(gulp.dest("./public/js/page/jsx/"));
});

//js压缩  一次性
gulp.task("jsMin",function(){
	var _DEST="public/js/page/js";

	gulp.src(["src/js/**/*.js"])
	.pipe(uglify({
		mangle:false
	}))
	.pipe(rename(function(path){
		path.extname=".min.js";//扩展名
	}))
	.pipe(gulp.dest(_DEST));
});


gulp.task("watch",function(){
	gulp.watch(["src/sass/***.scss"],function(){
		gulp.run("scss");
	});
});


gulp.task("scssWatch",function(){
	gulp.watch(["src/sass/***.scss"],function(){
		gulp.run("scss");
	});
});

gulp.task("jsxWatch",function(){
	gulp.watch(["src/jsx/**/*.jsx"],function(){
		gulp.run("jsx");
	});
});

gulp.task("jsWatch",function(){
	gulp.watch(["src/js/**/*.js"],function(){
		gulp.run("jsMin");
	});
});

gulp.task("allWatch",function(){
	gulp.run(["scssWatch","jsxWatch","jsWatch"]);
});