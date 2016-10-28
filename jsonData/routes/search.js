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
	var condation={
		$and:[
			{
				"province":query.province||/[\s\S]*/,
			},
			{
				"city":query.city||/[\s\S]*/,
			},
			{
				"area":query.area||/[\s\S]*/,
			}
		]
	};

	ElevatorModel.find(condation,function(err,data){
		if(err){
			console.log(err);
			res.json({
				result:false,
				msg:"查询错误"
			});
			return ;
		}
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
				province:item.province,
				city:item.city,
				area:item.area,
				cooperStart:item.cooperStart,//楼盘合作起始日期
				cooperEnd:item.cooperEnd,//楼盘合作终止日期
				loupanName:item.loupanName,//楼盘名字
			});
		});

		if(resData.dataList.length==0){
			resData.msg="暂未查到数据"
		}
		res.json(resData);
	})


});

module.exports=router;
