let fs=require("fs");
let path=require("path");

let isOneDayT=require("../../strategy/isOneDayT.js");

module.exports=function(req,res,err){
	var code=req.query.code||"000725";
	let resData={
		r:1,
		code:code,
		lists:[]
	};
	var url=path.resolve(__dirname,"../../baseData/historyData/"+code+".json");
	fs.stat(url,function(err,stat){
		if(err){
			console.log(err)
		}else{
			fs.readFile(url,function(err,data){
				var jsonData=JSON.parse(data);
				Object.keys(jsonData).forEach(function(key,i){
					if(key!="count"&&isOneDayT(jsonData[key].data)){
						resData.lists.push({time:key,data:jsonData[key]});
					}
				});
				resData.lists=resData.lists.sort(function(prev,next){
					return new Date(next.time)-new Date(prev.time);
				});
				res.json(resData);
				console.log(resData)
			});
		}
	})
};