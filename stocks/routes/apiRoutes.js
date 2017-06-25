//express的router  可以把router挂载到对应的exports上  可以定义不同的路由文件 极大地提高了灵活性   把不同的路由文件引入到app.js中即可  
var express=require("express");
var route=express.Router();

let selectIncrease =require("./controllers/apiSelectIncrease.js");
let apiSelectOneStockHistoryAllDayT =require("./controllers/apiSelectOneStockHistoryAllDayT.js");
let getAllCodes =require("./controllers/api/getAllCodes.js");
let testSearchOneCodeAllT=require('../testStrategy/testSearchOneCodeAllT');


route.get("/api/test",function(req,res,error){
	var query=req.query;
	var data={
		id:123,
		query:query
	};
	res.json(data);
});

route.get("/api/getAllCodes",async function(req,res,error){
	var query=req.query;

	let stocks=await getAllCodes();
	var data={
		query:query,
		stocks
	};
	res.json(data);
});

route.get("/api/getOneCodeAllT",async function(req,res,error){
	var query=req.query;

	let lists=await testSearchOneCodeAllT(query.code||"600000");
	var data={
		query:query,
		lists
	};
	res.json(data);
});

route.get("/api/selectIncrease",selectIncrease);
route.get("/api/apiSelectOneStockHistoryAllDayT",apiSelectOneStockHistoryAllDayT);


module.exports=route;