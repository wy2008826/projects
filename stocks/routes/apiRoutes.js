//express的router  可以把router挂载到对应的exports上  可以定义不同的路由文件 极大地提高了灵活性   把不同的路由文件引入到app.js中即可  
var express=require("express");
var route=express.Router();
let fs=require('fs');
let path=require('path');

let selectIncrease =require("./controllers/apiSelectIncrease.js");
let getAllCodes =require("./controllers/api/getAllCodes.js");
let getOneCodeHistoryData =require("./controllers/api/getOneCodeHistoryData.js");

let testSearchOneCodeAllT=require('../testStrategy/testSearchOneCodeAllT');
let searchAllSlotsAndSearchRecentDayT=require('./controllers/searchAllSlotsAndSearchRecentDayT');
let selectSingleSunKeepedDays=require("./controllers/selectSingleSunKeepedDays");
let getYMDHMS =require("./utils/getYMDHMS.js") ;

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


//每5分钟刷新一次
route.get("/api/getAllCodeRecentT",async function(req,res,error){
    
    let lists=[];
    let fileData=await readFile(path.resolve(__dirname,'../baseData/T.json'));
    if(fileData){
        lists=fileData.lists;
	}else{
        lists=recentTLists=await searchAllSlotsAndSearchRecentDayT();
	}
    var data={
        lists
    };
    res.json(data);
});



route.get("/api/selectSingleSunKeepedDays",async function(req,res,error){

    let lists=[];
    let fileData=await readFile(path.resolve(__dirname,'../baseData/SingleSunKeepDays.json'));
    if(fileData){
        lists=fileData.lists;
    }else{
        lists=recentTLists=await selectSingleSunKeepedDays();
    }
    var data={
        lists
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

function readFile(dir){
	return new Promise(function(resolve,reject){
        fs.readFile(dir,function(err,data){
			if(err){
				console.log('error');
                resolve(false);
			}else{
                resolve(JSON.parse(data));
			}
        });
	});
}

module.exports=route;

