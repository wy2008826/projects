//express的router  可以把router挂载到对应的exports上  可以定义不同的路由文件 极大地提高了灵活性   把不同的路由文件引入到app.js中即可  
var express=require("express");
var route=express.Router();

let selectIncrease =require("./controllers/apiSelectIncrease.js");
let getAllCodes =require("./controllers/api/getAllCodes.js");
let getOneCodeHistoryData =require("./controllers/api/getOneCodeHistoryData.js");

let testSearchOneCodeAllT=require('../testStrategy/testSearchOneCodeAllT');
let searchAllSlotsAndSearchOneDayT=require('./controllers/searchAllSlotsAndSearchOneDayT');

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

route.get("/api/getAllCodeNowT",async function(req,res,error){
    var query=req.query;

    let lists=await searchAllSlotsAndSearchOneDayT(query);
    var data={
        query:query,
        lists
    };
    res.json(data);
});
route.get("/api/getOneCodeHistoryData",async function(req,res,error){
    var query=req.query;
	const code=query.code;
	if(code){
        let result=await getOneCodeHistoryData(code);
        var data={
            query:query,
            result
        };
        res.json(data);
	}else{
        res.json({
			r:false
		});
	}

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


module.exports=route;