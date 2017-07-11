
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");

var getSortHistoryData=require('../utils/getSortHistoryData.js');
let calAverageLineData=require("../utils/calAverageLineData.js");
let calProfitFromOneDay=require("../utils/calProfitFromOneDay.js");

module.exports= function(){
	
	const strategyName=`本地数据库查找均线粘连的股票`;
	return new Promise(async function(resolve,reject){
		let start=new Date();
		let suits=[];
		
		let Query=StockModel.find({},["code"]);
		let codes;
		let count=await Query.then(function(docs){
			codes=docs;
			return docs.length||0;
		});

		if(!count){
			reject("find local database error");
		}else{
			console.log(`finding.......${strategyName}`);
			for(let i=0;i<count;i++){//需要对数据进行拆分，不然会导致内存泄漏
				let query=StockModel.findOne({code:codes[i].code});
				let suit=await searchOneCodeAverageClose(query);
				if(suit){
					suits=suits.concat(suit);
				}
			}


			let end=new Date();
			let minutes=( (end-start) / (1000 * 60 ) );
			console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);
			console.log(suits.slice(90,200));
			resolve(suits);
		};
	});
}

function searchOneCodeAverageClose(query){
	return new Promise(function(resolve,reject){
		return query.exec(async function(err,stock){
			if(err){
				console.log("find err:",err)
				reject(err);
			}else{
				
				let code=stock.code;
				let name=stock.name;
				let historyData=getSortHistoryData(stock.historyData.dataColects);
				let hisLength=historyData.length;
				if(historyData && hisLength>=60){
					let suits=[];
					let averageData=calAverageLineData(historyData);

					for(let i=60;i<hisLength-3;i++){
						let {_5,_10,_20,_30,_60}=averageData[i];
						let [buyTime,open,hign,low,close]=historyData[i+3];

						let max_aver=Math.max.apply(null,[_5,_10,_20,_30]);
						let min_aver=Math.min.apply(null,[_5,_10,_20,_30]);
						let {rate12,rate20,rate30}=calProfitFromOneDay(i+3,historyData);
						if( (max_aver-min_aver)/close<0.015 &&nextDaysUp(i,averageData)){
							suits.push({
								code,
								name,
								buyTime,
								rate12,
								rate20,
								rate30
							});
						}
					}
					resolve(suits);
				}
				resolve(false);
			}
		});
	});
}

function nextDaysUp(i,averageData){
	return averageData[i+1]['_5']<averageData[i+2]['_5']&&averageData[i+2]['_5']<averageData[i+3]['_5']
}


