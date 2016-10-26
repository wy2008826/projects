var express=require("express");
var router=express.Router();
var path=require("path");
var mongoose=require("mongoose");
var _=require("underscore");

var ElevatorModel=require("../models/elevator.js");
mongoose.connect("127.0.0.1:27017/evelator");


router.get("/add",function(req,res){
	res.render("add");
});

router.get("/addElevator.html",function(req,res){
	var query=req.query;
	var _elevator;
	if(query.id==undefined){//新增数据
		_elevator = new ElevatorModel({//根据model生成数据实例
			province:query.province,
			city:query.city,
			area:query.area,
			address:query.address,
			area:query.area,
			loupan:query.loupan,
			cooperStart:query.cooperStart,
			cooperEnd:query.cooperEnd,
			subHouses:query.subHouses
		});
		_elevator.save(function(err,data){
			if(err){
				res.json({
					result:false,
					msg:"新增楼盘失败"
				});
				console.log(err);
			}
			else{
				res.json({
					result:true,
					msg:"楼盘新增成功"
				});
			}
		});
	}

});

module.exports=router;