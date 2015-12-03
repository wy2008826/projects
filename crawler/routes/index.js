var express=require("express");
var router=express.Router();
var path=require("path");

var superagent=require("superagent");//ajax来使用http 发起get请求  返回数据
var cheerio=require("cheerio");
var eventproxy=require("eventproxy");


router.get("/",function(req,res){
	res.render("index",{title:"抓取任意网站数据"});
});

router.post("/getTargetPage",function(req,res){

	var arr=[];
	var page=50;
	// for(var i=0;i<page.length;i++){
		superagent.get("https://cnodejs.org/?tab=all&page=1").end(function(error,resHtml){

			var $=cheerio.load(resHtml.text);
			
			console.log(resHtml.text);
			$("body").eq(0).find(".user_avatar").each(function(index,elem){
				var img_src=$(elem).find("img").attr("src");
				arr.push({
					"url":img_src
				});
			});

			// if(i==page-1){
				res.json({
					"code":"1",
					"avatarImg":arr
				});
			// }
		});
	// }
	
});

module.exports=router;