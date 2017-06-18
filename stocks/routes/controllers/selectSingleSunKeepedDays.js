
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称

let maxDaysKeep=15;
let isSingleSunKeepd=require("../../strategy/isSingleSunKeepd.js");


module.exports= function(){// 
	
	const strategyName=`本地数据库查找单阳不破的股票`;

	return new Promise(function(resolve,reject){
		let start=new Date();
		
		let suits=[];
		
		console.log(`finding.......${strategyName}`);

		StockModel.find({},async function(err,stocks){
			if(err){
				reject(err);
			}else{
				for(let i=0;i<stocks.length;i++){//计算所有的股票当前是否满足条件
					
					let stock=stocks[i];
					let code=stock.code;
					let name=stock.name;
					let historyData=stock.historyData;
					
					if(historyData && historyData.lists.length>maxDaysKeep+3){
						var recentData=historyData.lists.slice(historyData.lists.length-maxDaysKeep-3);

						var result=isSingleSunKeepd(recentData);
						if(result.isSuit){
							suits.push({code,name,buyTime:result.buyTime});
						}
					}
				}
				
				
				let end=new Date();
				let minutes=( (end-start) / (1000 * 60 ) );
				console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);
				console.log(suits)
				
			}
			
		});
	});
}
