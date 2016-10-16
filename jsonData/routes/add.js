var express=require("express");
var router=express.Router();
var path=require("path");



router.get("/",function(req,res){
	res.render("add",{title:"抓取任意网站数据"});
});

router.get("/posttest.html",function(req,res){

	var arr=[];
	var page=50;
	res.json({
		"code":"1",
		"avatarImg":123
	});

});

module.exports=router;