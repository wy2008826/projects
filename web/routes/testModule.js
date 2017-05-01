var express=require("express");
var fs=require("fs");
var dns=require("dns");
var router=express.Router();



var dataJson=null;
var dataTxt=null;


//测试dns
router.get("/dns",function(req,res,error){
	dns.resolve4("www.baidu.com",function(error,address){
		res.send("address："+JSON.stringify(address));
	});
	
});

//res.send在第一次触发后，就已经调用了end方法，不能多次使用res.send方法
//测试file各种接口


router.get("/file",function(req,res,error){
	
	//读取文件
	var fileTxt=fs.readFileSync("files/txt.txt","utf-8");//读取文件只能用绝对路径？
	// res.send(fileTxt.toString());

	
	if(fs.exists("files/mkdir")){
		fs.rmdirSync("files/mkdir",0777);//删除文件夹
	}
	else{
		fs.mkdirSync("files/mkdir",0777);//新建文件夹
	}
	


	//判断文件是否存在 写入、更改文件
	fs.exists("files/writeFile.txt",function(exists){//
		if(!exists){
			fs.writeFileSync("files/writeFile.txt","1","utf-8");
			res.send("1");
		}
		else{
			var fileContent=fs.readFileSync("files/writeFile.txt","utf8");
			var newFileContent=(parseFloat(fileContent.toString())+1)+"";
			fs.writeFileSync("files/writeFile.txt",newFileContent,"utf-8");
			res.send(newFileContent);
		}
	});

});

module.exports=router;