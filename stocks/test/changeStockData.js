var path=require("path");

var mongoose=require("mongoose");

var StockModel=require("../models/stock.js");



module.exports=async function(code,time=undefined){
	

	var code="600100";
	return new Promise(function(resolve,reject){
		StockModel.findBy({code:code},function(err,data){
			if(err){
				reject(err);
			}else{
				if(!data.historyData){//数据库中没有历史数据
					reject(false);
				}else{//数据库中存在历史数据
					
					if(!data.historyData.dataColects[time]&&time){
						data.historyData.dataColects[time]=dayData;
					}
					let times=Object.keys(data.historyData.dataColects);
					let length=times.length;

					delete data.historyData.dataColects[times[length-1]];
					// data.historyData.dataColects[times[length-1]][1]=1000;

					StockModel.update({code:code},data,function(err){
						if(err){
							reject(err);
						}else{
							console.log(`数据更新成功！`)
							resolve(true);
						}
					});
				}
			}
		})
	});
}


