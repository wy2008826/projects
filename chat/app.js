var express=require("express");
var app=express();

var server=require("http").createServer(app);
var io=require("socket.io").listen(server);
var hbs=require("hbs");


app.use(express.static(__dirname+"/public"));
app.set("view engine","hbs");
app.set("views",__dirname+"/views");


app.use("/index",function(req,res){
	
	res.render("index.hbs",{title:"测试测试"});
});

// app.use("/",function(req,res){
// 	res.writeHead(200,{"Content-Type":"text/plain;charset:utf-8"});
// 	res.end("213213");
// });

io.on('connection', function (socket) {
  socket.emit('data',"213123");
  socket.on('sendData', function (data) {
    console.log(data);
  });
});



server.listen(9000,function(){
	console.log("server is start on port 9000");
})


