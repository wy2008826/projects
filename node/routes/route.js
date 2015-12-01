
module.exports=function(app){
	app.get("/index",function(req,res,error){
		res.render("index",{name:"习大大，哈哈哈"});
	});
}