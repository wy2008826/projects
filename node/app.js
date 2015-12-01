//express的核心是http模块

var http=require("http");
var express=require("express");
var hbs=require("hbs");
var app=express();


var routes=require("./routes/route")(app);//定义路由文件



app.use(express.static(__dirname+"/public"));//设置静态资源路径
app.set("view engine","hbs");//设置模板引擎
app.set("views",__dirname+"/views");//设置视图路径


app.listen(3000);