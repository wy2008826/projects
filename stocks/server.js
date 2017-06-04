//express的核心是http模块

var http=require("http");
var express=require("express");
var hbs=require("hbs");
var app=express();



app.use(express.static(__dirname+"/dist"));//设置静态资源路径
app.set("view engine","hbs");//设置模板引擎
app.set("views",__dirname+"/views");//设置视图路径


var pageRoutes=require("./routes/pageRoutes");//页面路由
var apiRoutes=require("./routes/apiRoutes");//api路由
var crawRoutes=require("./routes/crawRoutes");//api路由



app.use("/",pageRoutes);
app.use("/",apiRoutes);
app.use("/",crawRoutes);

app.listen(3000);