

let crawHistoryDataOne=require("./crawHistoryDataOne.js");
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称


let timeFormat=require("../utils/getYMDHMS.js");
//从数据库中查找股票的历史数据，按照历史数据最近一次的日期进行历史数据查询  完善数据库历史数据记录
module.exports=async function(){
	let begain=new Date();
	return new Promise(function(resolve,reject){
		StockModel.find({},async function(err,stocks){
			if(err){
				console.log("find data error!");
				reject(err);
			}else{
				for(let i=0;i<stocks.length;i++){
					
					let stock=stocks[i];
					let code=stock.code;
					let historyData=stock.historyData;
					let start;
					if(historyData){
						start=historyData.end;
						if(getDay(start)==getDay(new Date())){
							console.log("code historyData is fresh to now! skiped....")
							continue;
						}
					}
					
					await crawHistoryDataOne(code,start);
				
				}
				let end=new Date();
				let minutes=( (end-begain) / (1000 * 60 ) );
				console.log(`loaded all historyData 😊 !!! 共耗时 ${minutes} 分钟`)
			}
		});
	}).catch(function(){
		console.log("begain craw historyData error!")
	});
	
}


function getDay(_time){
	let time=new Date(_time);
	let format=timeFormat(time);
	return format.year+"-"+format.month+"-"+format.date;
}