//buffer+字符串  会默认把buffer转换为字符转  所以可以""+new Buffer("hanghzou杭州")


var http=require("http");
var url="http://javascript.ruanyifeng.com/nodejs/http.html";
url="http://www.baidu.com";
http.get(url,function(res){
	var body="";
	res.on("data",function(d){
		body+=d;//body+=d 和body+=d.toString()是一样的效果
	});

	res.on("end",function(){
		console.log(body);
	});
	


	
	var buf=new Buffer("abcde杭州");
	console.log(buf+"",buf);

});