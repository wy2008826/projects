var koa=require("koa");
var app=koa();

var koaStatic=require("koa-static");//静态文件
var koaRouter=require("koa-router");//koa路由
var router=new koaRouter();
var koaViews=require("koa-views");//koa页面指定
var koaHbs=require("koa-hbs");//模板引擎


app.use(koaStatic(__dirname+"/statics"));//设置静态资源路径
app.use(koaHbs.middleware({//设置页面访问路径
	viewPath:__dirname+"/views"
}));


var addroute=require("./routes/add")(router);//新增楼盘
var searchroute=require("./routes/search")(router);//查询楼盘信息




var routesAdd=require("./routes/add");//添加电梯
app.use("/",routesAdd);

var routesSearch=require("./routes/search");//查询电梯
app.use("/",routesSearch);




app.use(router.routes());

app.listen(3000,function(){
	console.log("server is start on port 9000");
});


