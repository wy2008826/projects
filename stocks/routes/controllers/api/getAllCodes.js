
var StockModel=require("../../../models/stock.js");
let stocks;

module.exports=async function(page=0,pageSize=100){
	return new Promise(async function(resolve,reject){
		if(!stocks){
			let Query=StockModel.find({},["code","name"]);
			Query.exec(function(err,stocks){
				if(err){
					console.log("find err:",err)
					reject(err);
				}else{
					let length=stocks.length;
					let all=[];
					for(let i=0;i<length;i++){
						let stock=stocks[i];
						all.push({
							code:stock["code"],
							name:stock["name"]
						});
					}
					stocks=all;
					resolve(all);
				}
			});
		}else{
			resolve(stocks);
		}

	}).catch(function(){
		console.log("begain craw historyData error!")
	});
	
}
