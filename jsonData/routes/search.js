var express=require("express");
var router=express.Router();
var path=require("path");
var mongoose=require("mongoose");

var ElevatorModel=require("../models/elevator.js");
// mongoose.connect("127.0.0.1:27017/evelator");



router.get("/search",function(req,res){
	res.render("search",{title:"查询"});
});

router.get("/searchElevator.html",function(req,res){//查询数据库是异步流程，如何在查询成功后进行返回
	var query=req.query;
	console.log(query);
	ElevatorModel.fetch(function(err,data){//查询结果是数组
		if(err){
			console.log(err);
		}
		else{
			var total=data.length;
			console.log(data[0]);

			var resData={
				result:true,
				dataList:[],
				pages:{
					currentPage:query.current,
					pages:Math.ceil(total / query.pageSize),
					total:total,
				}
			};
			data.forEach(function(item,index){
				resData.dataList.push({
					city:item.city,
					area:item.area,
					house:"",
					houseNumber:""
				});
			});
			res.json(resData);
		}
	});
	

	var arr=[];
	var page=50;
	

});

module.exports=router;
