

module.exports=function(app){
	//首页
	app.get("/index",function(req,res,next){
		var data={
			title:"首页"
		};
		res.render("index",data);
		
	});

	//个人简历
	app.get("/resume",function(req,res,next){
		res.render("resume");
	});

	
}