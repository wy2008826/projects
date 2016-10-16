var express=require("express");
var router=express.Router();
var path=require("path");



router.get("/add",function(req,res){
	res.render("add",{title:"新增楼盘"});
});



module.exports=router;