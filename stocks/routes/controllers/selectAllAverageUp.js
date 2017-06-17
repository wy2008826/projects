
var calAverageLineData=require("../utils/calAverageLineData.js");
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称


module.exports= function(){
	const strategyName='本地数据库查找到所有的均线多头排列股票';

	return new Promise(function(resolve,reject){
		let start=new Date();
		let suits=[];
		
		console.log(`finding.......${strategyName}`);
		StockModel.find({},async function(err,stocks){
			for(let i=0;i<stocks.length;i++){
				
				let stock=stocks[i];
				let code=stock.code;
				let name=stock.name;
				let historyData=stock.historyData;
				let isSuit=true;
				
				if(historyData && historyData.lists.length>80){
					let averageArr=calAverageLineData(historyData.lists.slice(historyData.lists.length-60));
					// console.log(averageArr);
					
					for(let j=averageArr.length-1;j>averageArr.length-3;j--){
						var aver=averageArr[j];
						if(isNotAllLineUp(aver) || (aver["_5"]-aver["_40"])/aver["_40"] >=0.02 ){
							isSuit=false;
							break;
							
						}
					}
					
					if(isSuit){
						suits.push({code,name});
					}
				}
			}
			let results={
				name:strategyName,
				suits
			};
			let end=new Date();
			let minutes=( (end-start) / (1000 * 60 ) );
			console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);
			console.log( results);
			resolve(results);
		});
	});
}


function isAllLineUp(aver){
	return aver["_5"]>aver["_10"] && aver["_10"] > aver["_20"] && aver["_20"] > aver["_30"] &&  aver["_30"] > aver["_40"];
}
function isNotAllLineUp(aver){
	return aver["_5"] < aver["_10"] || aver["_10"] < aver["_20"] || aver["_20"] < aver["_30"] ||  aver["_30"] < aver["_40"];
}





