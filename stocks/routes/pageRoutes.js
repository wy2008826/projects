//express的router  可以把router挂载到对应的exports上  可以定义不同的路由文件 极大地提高了灵活性   把不同的路由文件引入到app.js中即可  
//可以设置通用的路由 ／page／＊    这样每次添加的页面不需要再次添加路由   但没有定制化  

var express=require("express");
var url=require("url");
var path=require("path");
var fs=require("fs");
var route=express.Router();



// route.get("/page/about",function(req,res,error){
// 	res.render("about",{title:"this is a about page!"});
// });

route.get("/page/*",function(req,res){
	var urlObj=url.parse(req.url,true);
	var viewPath=urlObj.pathname.substr(6);
	var viewFullPath=path.resolve(__dirname,"../views/",viewPath) +".hbs";

	if(viewPath=="index"){//首页
		indexController(req,res);
	}
	else if(viewPath=="about"){//关于
		aboutController(req,res);
		
	}
	else{//其它任何页面
		
		fs.stat(viewFullPath,function(error,stat){
			if(error){//404页面
				res.render("404",{title:"page not found"});
			}
			else{//其它静态页面
				res.render(viewPath,{title:"this page is from :"+viewPath});
			}
		});
		
	}
});

function indexController(req,res){
	var data={
		keys:Object.keys(module),
		id:module.id,
		filename:module.filename,
		loaded:module.loaded,
		parent:module.parent,
		children:module.children

	};
	res.render("index",data);
}

function aboutController(req,res){
	res.render("about",{title:"this is a about page!"});
}

module.exports=route;