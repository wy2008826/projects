//express的router  可以把router挂载到对应的exports上  可以定义不同的路由文件 极大地提高了灵活性   把不同的路由文件引入到app.js中即可  
var express=require("express");

var route=express.Router();

route.get("/api/index",function(req,res,error){
	var query=req.query;
	var data={
		id:123,
		query:query
	};
	res.json(data);
});

route.get("/api/about",function(req,res,error){
	res.json({title:"this is a about page!"});
});

route.get("/api/uploadFile",function(req,res,error){
	
	var query=req.query;
	var username=query.username;
	console.log(query);
	res.redirect("/page/form",200,{title:"提交成功!",username:username});
});


module.exports=route;