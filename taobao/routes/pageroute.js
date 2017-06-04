var express=require("express");
var router=express.Router();



router.get("/addSubHouse.hbs",function(req,res){//新增子楼
	res.render("addSubHouse");
});


router.get("/addElevator.hbs",function(req,res){//新增子楼的电梯
	var query=req.query;
	res.render("addElevator",query);
});

router.get("/addElevatorWall.hbs",function(req,res){//新增电梯每一个墙面的合作信息
	var query=req.query;
	res.render("addElevatorWall",query);
});

module.exports=router;