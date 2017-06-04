var koa=require("koa");
var app=koa();

var koaStatic=require("koa-static");//静态文件
var koaRouter=require("koa-router");//koa路由
var router=new koaRouter();
var koaViews=require("koa-views");//koa页面指定
var koaHbs=require("koa-hbs");//模板引擎




app.use(koaStatic(__dirname+"/statics"));//设置静态资源路径

app.use(koaViews(__dirname+"/views",{//设置模板页面位置
	map:{
		html:"hbs"
	}
}));

app.use(koaHbs.middleware({
	viewPath:__dirname+"/views"
}));


router.get("/add.hbs",function*(next){
	console.log(this.path);
	var pageData={
		title:"哈哈"
	};
	yield this.render("add",pageData);//必须使用yield
	
});
