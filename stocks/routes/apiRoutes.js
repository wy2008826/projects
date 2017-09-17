//express的router  可以把router挂载到对应的exports上  可以定义不同的路由文件 极大地提高了灵活性   把不同的路由文件引入到app.js中即可  
var express=require("express");
var route=express.Router();
let fs=require('fs');
let path=require('path');

let getAllCodes =require("./controllers/api/getAllCodes.js");
let getOneCodeHistoryData =require("./controllers/api/getOneCodeHistoryData.js");
let register =require("./controllers/api/register.js");
let login =require("./controllers/api/login.js");
let online =require("./controllers/api/online.js");
let addZixuan =require("./controllers/api/addZixuan.js");
let getZixuan =require("./controllers/api/getZixuan.js");
let addTradeWarn =require("./controllers/api/addTradeWarn.js");

let getYMDHMS =require("./utils/getYMDHMS.js") ;
let apiDIY =require('./controllers/apiDIY.js');
let suanfa =require('../const/suanfa.js');


route.get("/api/test",function(req,res,error){
	var query=req.query;
	var data={
		id:123,
		query:query
	};
	res.json(data);
});

route.get("/api/register",async function(req,res,error){
    let query=req.query;
    let result=await register(query);

    res.json(result);
});

route.get("/api/login",async function(req,res,error){
    let query=req.query;
    let result=await login(query);

    res.json(result);
});
route.get("/api/online",async function(req,res,error){
    let query=req.query;
    let result=await online(query);
    res.json(result);
});
route.get("/api/addZixuan",async function(req,res,error){
    let query=req.query;
    let result=await addZixuan(query);
    res.json(result);
});
route.get("/api/getZixuan",async function(req,res,error){
    let query=req.query;
    let result=await getZixuan(query);
    res.json(result);
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

route.get("/api/addTradeWarn",async function(req,res,error){
    let query=req.query;
    let result=await addTradeWarn(query);
    res.json(result);
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



route.get("/api/getAllCodeRecentT",async function(req,res,error){
    
    let lists=[];
    let fileData=await readFile(path.resolve(__dirname,'../baseData/T.json'));
    if(fileData){
        lists=fileData.lists;
	}else{
        lists=await apiDIY(suanfa.T);
	}
    var data={
        createTime:fileData && fileData.time,
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
        lists=await apiDIY(suanfa.SingleSunKeepDays);
    }
    var data={
    	createTime:fileData && fileData.time,
        lists
    };
    res.json(data);

});

route.get("/api/bouncePrice",async function(req,res,error){

    let lists=[];
    let fileData=await readFile(path.resolve(__dirname,'../baseData/bouncePrice.json'));
    if(fileData){
        lists=fileData.lists;
    }else{
        lists=await apiDIY(suanfa.bouncePrice);
    }
    var data={
        createTime:fileData && fileData.time,
        lists
    };
    res.json(data);

});


route.get("/api/singleSunUpClosedAverage",async function(req,res,error){

    let lists=[];
    let fileData=await readFile(path.resolve(__dirname,'../baseData/singleSunUpClosedAverage.json'));
    if(fileData){
        lists=fileData.lists;
    }else{
        lists=await apiDIY(suanfa.singleSunUpClosedAverage);
    }
    var data={
        createTime:fileData && fileData.time,
        lists
    };
    res.json(data);

});


route.get("/api/bounceVol",async function(req,res,error){

    let lists=[];
    let fileData=await readFile(path.resolve(__dirname,'../baseData/bounceVol.json'));
    if(fileData){
        lists=fileData.lists;
    }else{
        lists=await apiDIY(suanfa.bounceVol);
    }
    var data={
        createTime:fileData && fileData.time,
        lists
    };
    res.json(data);
});



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

