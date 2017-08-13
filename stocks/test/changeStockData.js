var path=require("path");

var mongoose=require("mongoose");

var StockModel=require("../models/stock.js");



module.exports=async function(code,time=undefined){
	

	var code="600000";
	return new Promise(function(resolve,reject){
		StockModel.findBy({code:code},function(err,data){
			if(err){
				reject(err);
			}else{
				if(!data.historyData){//数据库中没有历史数据
					reject(false);
				}else{//数据库中存在历史数据
					
					let times=Object.keys(data.historyData.dataColects);
					let length=times.length;
					console.log(length);
                    // data.historyData.dataColects={};
					let newData={};
                    for(let k=0;k<length;k++){
                    	console.log(times[k]);
                        newData[times[k]]=data.historyData.dataColects[times[k]]
					}

                    delete newData['2017-08-11'];
                    data.historyData.dataColects=newData;

					StockModel.update({code},data,function(err){
						if(err){
							reject(err);
						}else{
							console.log(`数据更新成功！`,data)
							resolve(true);
						}
					});
				}
			}
		})
	});
}


