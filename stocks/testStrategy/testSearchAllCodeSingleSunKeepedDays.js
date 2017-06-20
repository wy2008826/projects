

var mongoose=require("mongoose");

var StockModel=require("../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称

let maxDaysKeep=15;
let isSingleSunKeepd=require("../strategy/isSingleSunKeepd.js");


module.exports=function(code="600000"){
	const strategyName=`本地数据库查找 ${code} 单阳不破的买点`;


	return new Promise(function(resolve,reject){
		let start=new Date();
		
		let suits=[];
		
		console.log(`finding.......${strategyName}`);

		StockModel.find({},async function(err,stocks){
			if(err){
				reject(err);
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
				
				
				let end=new Date();
				let minutes=( (end-start) / (1000 * 60 ) );
				console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);
				console.log(suits)
				resolve(suits);
			}
			
		});
	});
}
