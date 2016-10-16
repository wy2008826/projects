//express的核心是http模块

var http=require("http");
var express=require("express");
var router=express.Router();
var hbs=require("hbs");
var app=express();



app.use(express.static(__dirname+"/statics"));//设置静态资源路径
app.set("view engine",hbs);//设置模板引擎
app.set("views",__dirname+"/views/");//设置视图路径


var routesAdd=require("./routes/add");//添加楼盘路由

app.use("/add",routesAdd);


app.listen(3000);