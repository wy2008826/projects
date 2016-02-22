module.id=12321;//module下面挂载的值可以被篡改

module.exports=function(app){
	app.get("/index",function(req,res,error){
		var data={
			keys:Object.keys(module),
			id:module.id,
			filename:module.filename,
			loaded:module.loaded,
			parent:module.parent,
			children:module.children

		};
		res.render("index",data);
	});
}