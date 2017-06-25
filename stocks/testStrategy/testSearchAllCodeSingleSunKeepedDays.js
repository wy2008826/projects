

var mongoose=require("mongoose");

var StockModel=require("../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称

let maxDaysKeep=15;
let isSingleSunKeepd=require("../strategy/isSingleSunKeepd.js");
let getStocksCount=require("../routes/utils/getStocksCount.js");
let suits=[];

module.exports=function(){
	const strategyName=`本地数据库查找 单阳不破的买点`;


	return new Promise(async function(resolve,reject){
		let start=new Date();
		
		
		let count=await getStocksCount();

		if(!count){
			reject("find local database error");
		}else{
			console.log(`finding.......${strategyName}`);
			let step=100;
			for(let i=0;i<count;i+=step){//需要对数据进行拆分，不然会导致内存泄漏
				let query=StockModel.find({});
				query.skip(i);
				query.limit(step);
				await searchGroups(query);

			}
			
			let end=new Date();
			let minutes=( (end-start) / (1000 * 60 ) );
			console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);
			console.log(suits)
			resolve(suits);
		};
		
	});
}


function searchGroups(query){
	// return new Promise(function(resolve,reject){
		return query.exec(async function(err,stocks){
			if(err){
				console.log("find err:",err)
				// reject(err);
			}else{
				for(let i=0;i<stocks.length;i++){
					let stock=stocks[i];
					let code=stock.code;
					let name=stock.name;
					let historyData=stock.historyData;
					let length=historyData.lists.length;

					if(historyData && length>maxDaysKeep+3){
						for(let j=length-maxDaysKeep-3;j>18;j-- ){
							var areaData=historyData.lists.slice(j,j+18);
							var result=isSingleSunKeepd(areaData);
							if(result.isSuit){
								suits.push({code,name,buyTime:result.buyTime});
							}
						}
					}
					
				}
				// resolve();
			}
		});
	// });
}


