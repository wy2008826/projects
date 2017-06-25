
var StockModel=require("../models/stock.js");
var isOneDayT=require('../strategy/isOneDayT.js');

module.exports=async function(code='000725'){
	let suits=[];
	return new Promise(function(resolve,reject){
		StockModel.findBy({code},function(err,stock){
			if(err){
				console.log(err);
				reject(false);
			}else{
				let historyData=stock.historyData.lists;
				let length=historyData.length;

				for(let i=0;i<length;i++){
					let day=historyData[i];

					if(isOneDayT(day)){
						suits.push(day);
					}
				}
				
				console.log(suits);
				resolve(suits);
			}
		});
	});
	
}