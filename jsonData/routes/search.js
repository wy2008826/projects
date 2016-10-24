var express=require("express");
var router=express.Router();
var path=require("path");
var mongoose=require("mongoose");

var ElevatorModel=require("../models/elevator.js");
// mongoose.connect("127.0.0.1:27017/evelator");



router.get("/search",function(req,res){
	res.render("search",{title:"查询"});
});

router.get("/searchElevator.html",function(req,res){//
	var query=req.query;
	
	console.log(query);
	ElevatorModel.fetch(function(err,data){//查询结果是数组
		if(err){
			console.log(err);
		}
		else{
			var total=data.length;
			var from=(query.current-1)*query.pageSize;
			var to=(from+query.pageSize*1)>total?total:from+query.pageSize*1;
			
			var resData={
				result:true,
				dataList:[],
				pages:{
					currentPage:query.current,
					pages:Math.ceil(total / query.pageSize),
					total:total,
				}
			};
			data.slice(from,to).forEach(function(item,index){
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

});

module.exports=router;
