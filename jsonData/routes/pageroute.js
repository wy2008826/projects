var express=require("express");
var router=express.Router();



router.get("/addSubHouse.hbs",function(req,res){//新增子楼
	res.render("addSubHouse");
});


router.get("/addElevator.hbs",function(req,res){//新增子楼的电梯
	var query=req.query;
	res.render("addElevator",query);
});



module.exports=router;