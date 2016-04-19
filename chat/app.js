var express=require("express");
var app=express();

var http=require("http").Server(app);
var io=require("socket.io")(http);
var hbs=require("hbs");


app.use(express.static(__dirname+"/public"));
app.set("view engine","hbs");
app.set("views",__dirname+"/views");


app.use("/index",function(req,res){
	
	res.render("index.hbs",{title:"测试测试"});
});

app.use("/socket.io/",function(req,res){
	res.writeHead(200,{"Content-Type":"text/html;charset:utf-8"});
	res.end("213213");
});

io.on('connection', function (socket) {
  socket.emit('data', { hello: 'world' });
  socket.on('sendData', function (data) {
    console.log(data);
  });
});



http.listen(3000,function(){
	console.log("server is start on port 3000");
})


