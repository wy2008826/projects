
var StockModel=require("../models/stock.js");
var isOneDayT=require('../strategy/isOneDayT.js');
var getSortHistoryData=require('../routes/utils/getSortHistoryData.js');

module.exports=async function(code='000725'){
	let suits=[];
	return new Promise(function(resolve,reject){
		StockModel.findBy({code},function(err,stock){
			if(err){
				console.log(err);
				reject(false);
			}else{
				let historyData=getSortHistoryData(stock.historyData.dataColects);
				let length=historyData.length;
				// console.log(historyData);
				for(let i=0;i<length;i++){
					let day=historyData[i];

					if(isOneDayT(day)){
						suits.push(day);
					}
				}
				
				console.log(code+":所有的单日 T:",suits);
				resolve(suits);
			}
		});
	});
}