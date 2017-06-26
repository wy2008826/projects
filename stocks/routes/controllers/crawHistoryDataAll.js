

let crawHistoryDataOne=require("./crawHistoryDataOne.js");
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");

//使用process.nextTick()可以避免console过多导致的内存崩溃

let timeFormat=require("../utils/getYMDHMS.js");


//从数据库中查找股票的历史数据，按照历史数据最近一次的日期进行历史数据查询  完善数据库历史数据记录
module.exports=async function(){
	let begain=new Date();
	return new Promise(async function(resolve,reject){

		let Query=StockModel.find({},["code"]);
		let count=await Query.then(function(docs){
			return docs.length||0;
		});
		
		if(!count){
			reject("find local database error");
		}else{
			let step=100;
			for(let i=0;i<count;i+=step){//需要对数据进行拆分，不然会导致内存泄漏
				let query=StockModel.find({});
				query.skip(i);
				query.limit(step);
				await crawGroups(query);
			}
			let end=new Date();
			let minutes=( (end-begain) / (1000 * 60 ) );
			console.log(`loaded all historyData 😊 !!! 共耗时 ${minutes} 分钟`);
			resolve();
		}


	}).catch(function(){
		console.log("begain craw historyData error!")
	});
	
}



function crawGroups(query){
	return new Promise(function(resolve,reject){
		return query.exec(async function(err,stocks){
			if(err){
				console.log("find err:",err)
				reject(err);
			}else{
				let length=stocks.length;
				let i=0;

				async function startCraw(){
					if(i<length){
						let stock=stocks[i];
						let code=stock.code;
						let historyData=stock.historyData;
						let start;
						if(historyData){
							start=historyData.end;
							if(getDay(start)==getDay(new Date())){
								console.log("code historyData is fresh to now! skiped....");
								i+=1;
								process.nextTick(startCraw);
							}else{
								await crawHistoryDataOne(code,start);
								i+=1;
								process.nextTick(startCraw);
							}
						}else{
							await crawHistoryDataOne(code,start);
							i+=1;
							process.nextTick(startCraw);
						}
					}else{
						resolve();
					}
				}
				startCraw();
				
			}
		});
	});
}



function getDay(_time){
	let time=new Date(_time);
	let format=timeFormat(time);
	return format.year+"-"+format.month+"-"+format.date;
}