//express的核心是http模块

var http=require("http");
var express=require("express");
var hbs=require("hbs");
var app=express();



app.use(express.static(__dirname+"/statics"));//设置静态资源路径
app.set("view engine","hbs");//设置模板引擎
app.set("views",__dirname+"/views");//设置视图路径





var routesAdd=require("./routes/add");//添加电梯
app.use("/",routesAdd);

var routesSearch=require("./routes/search");//查询电梯
app.use("/",routesSearch);



app.listen(3000);
console.log("server in running on port:3000");