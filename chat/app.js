var koa=require("koa");
var app=koa();

var koaStatic=require("koa-static");//静态文件
var koaRouter=require("koa-router");//koa路由
var router=new koaRouter();
var koaViews=require("koa-views");//koa页面指定
var koaHbs=require("koa-hbs");//模板引擎


var server=require("http").createServer(app.callback());
var io=require("socket.io").listen(server);


app.use(koaStatic(__dirname+"/public"));//设置静态资源路径

app.use(koaViews(__dirname+"/views",{//设置模板页面位置
	map:{
		html:"hbs"
	}
}));

app.use(koaHbs.middleware({
	viewPath:__dirname+"/views"
}));


router.get("/index.html",function*(next){
	console.log(this.path);
	var pageData={
		title:"哈哈"
	};
	yield this.render("index",pageData);//必须使用yield
	
});


router.get("/passport/reg.html",function*(next){

	yield this.render("passport/reg");
});

app.use(router.routes());


//那么问题来了  如果一个网站有很多地方用到实时通信怎么玩？
io.on('connection', function (socket) {

	socket.emit('serverData',{
	  	randomNum:Math.round(Math.random()*100),
	  	result:true,
	  	isLogin:true
	});

	socket.on('clientData', function (data) {
	    console.log(data);

	    socket.emit('serverData',{
		  	randomNum:Math.round(Math.random()*100),
		  	result:true,
		});

	});
});


server.listen(9000,function(){
	console.log("server is start on port 9000");
});



