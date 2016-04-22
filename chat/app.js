var express=require("express");
var app=express();

var server=require("http").createServer(app);
var io=require("socket.io").listen(server);
var hbs=require("hbs");


app.use(express.static(__dirname+"/public"));
app.set("view engine","hbs");
app.set("views",__dirname+"/views");


app.use("/index",function(req,res){
	res.render("index.hbs",{title:"自制聊天室"});
});

app.use("/passport/reg",function(req,res){
	res.render("passport/reg.hbs");
});



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



