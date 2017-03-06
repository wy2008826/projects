

module.exports=function(app){
	//首页
	app.get("/",function(req,res,next){
		res.render("index");
	});

	app.get("/index.html",function(req,res,next){
		res.render("index");
	});

	//个人简历
	app.get("/resume.html",function(req,res,next){
		res.render("resume");
	});


}