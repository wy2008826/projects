var express=require("express");
var router=express.Router();
var path=require("path");
var mongoose=require("mongoose");

// mongoose.connect("127.0.0.1:27017/evelator");



router.get("/search",function(req,res){
	res.render("search",{title:"查询"});
});

router.get("/searchElevators.html",function(req,res){

	var arr=[];
	var page=50;
	res.json({
		"code":"1",
		"avatarImg":123
	});

});

module.exports=router;
