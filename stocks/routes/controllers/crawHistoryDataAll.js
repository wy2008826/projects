

let crawHistoryDataOne=require("./crawHistoryDataOne.js");//新浪接口
let crawHistoryDataOneFrom163=require("./crawHistoryDataOneFrom163.js");

var mongoose=require("mongoose");


var StockModel=require("../../models/stock.js");

//使用process.nextTick()可以避免console过多导致的内存崩溃

let timeFormat=require("../utils/getYMDHMS.js");
let sleep=require('../utils/sleep.js');

//从数据库中查找股票的历史数据，按照历史数据最近一次的日期进行历史数据查询  完善数据库历史数据记录
module.exports=async function(){
	let begain=new Date();
	console.log('begain craw history data all');
	return new Promise(async function(resolve,reject){
		let Query=StockModel.find({},["code"]);
		let codes;
		let count=await Query.then(function(docs){
			codes=docs;
			return docs.length||0;
		});
		if(!count){
			resolve("find local database error");
		}else{
			for(let i=0;i<count;i++){//需要对数据进行拆分，不然会导致内存泄漏
				let query=StockModel.findOne({code:codes[i].code});
				await crawCode(query);
			}
			let end=new Date();
			let minutes=( (end-begain) / (1000 * 60 ) );
			console.log(`loaded all historyData 😊 !!! 共耗时 ${minutes} 分钟`);
			resolve(true);
		}


	}).catch(function(){
		console.log("begain craw historyData error!")
	});
}


function crawCode(query){
	return new Promise(function(resolve,reject){
		return query.exec(async function(err,stock){
			if(err){
				console.log("find err:",err)
				reject(err);
			}else{
				let {code,area,historyData}=stock;
				let start;
				if(historyData){
					let times=Object.keys(historyData.dataColects).sort(function(prev,next){
						return new Date(prev)-new Date(next);
					});
					let startIndex=Math.max(times.length-10,0);
					start=times[startIndex];
				}
				// await crawHistoryDataOne(code,start);
                await crawHistoryDataOneFrom163(code,area,start);
				await sleep(2000);
				resolve(true);
			}
		});
	}).catch(function(){
		console.log('craw code error!');
	});
}



function getDay(_time){
	let time=new Date(_time);
	let format=timeFormat(time);
	return format.year+"-"+format.month+"-"+format.date;
}