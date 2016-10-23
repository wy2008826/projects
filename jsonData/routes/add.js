var express=require("express");
var router=express.Router();
var path=require("path");
var mongoose=require("mongoose");

var ElevatorModel=require("../models/elevator.js");
mongoose.connect("127.0.0.1:27017/evelator");


router.get("/add",function(req,res){
	res.render("add",{title:"抓取任意网站数据"});
});

router.get("/addElevator.html",function(req,res){
	var query=req.query;
	// console.log(query,ElevatorModel.findByKey("city"));
	ElevatorModel.save(query,function(err){
		if(err){
			console.log(err);
		}
		else{
			res.json({
				"code":"1",
				"avatarImg":123
			});
		}
	});
	

});

module.exports=router;