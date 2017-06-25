
var StockModel=require("../../models/stock.js");

module.exports=function (){
	return new Promise(function(resolve,reject){
		StockModel.count({},function(err,count){
			if(err){
				reject(0);
			}else{
				resolve(count);
			}
		});
	}).catch(function(err){
		console.log("查找股票数量失败 ！！！！！")
	});
}

