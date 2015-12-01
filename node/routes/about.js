//express的router  可以把router挂载到对应的exports上  可以定义不同的路由文件 极大地提高了灵活性   把不同的路由文件引入到app.js中即可  
var express=require("express");

var route=express.Router();

route.get("/about",function(req,res,error){
	res.render("about",{title:"this is a about page!"});
});

module.exports=route;