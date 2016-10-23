var express=require("express");
var router=express.Router();
var path=require("path");
var mongoose=require("mongoose");

// mongoose.connect("127.0.0.1:27017/evelator");



router.get("/search",function(req,res){
	res.render("search",{title:"查询"});
});

router.get("/searchElevator.html",function(req,res){

	var arr=[];
	var page=50;
	res.json({
		result:true,
		dataList:[
			{
				city:"杭州",
				area:"西湖区",
				house:"123",
				houseNum:100
			}
		]
	});

});

module.exports=router;
