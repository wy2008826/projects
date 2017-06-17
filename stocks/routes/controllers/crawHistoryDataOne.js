var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var fs=require("fs");
var path=require("path");
var cheerio=require("cheerio");

var mongoose=require("mongoose");


var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称


function getInitialHistoryData(){
	return {
		count:0,
		start:"2050-01-01",
		end:"2000-01-01",
		timeColect:{},
		lists:[]
	};
}
let historyData=getInitialHistoryData();


const Max_year=0.5;


module.exports=async function(code,time=undefined){
	historyData=getInitialHistoryData();

	var code=code||"600000";
	
	let yearJiduArr=createYearJiDu(time);
	for(let i=0;i<yearJiduArr.length;i++){
		await crawJiDuData(code,yearJiduArr[i][0],yearJiduArr[i][1]);
	}
	historyData.lists.sort(function(prev,next){
		return new Date(prev[0])-new Date(next[0]);
	});
	await saveHistoryData(code);
	console.log(historyData)
}


async function crawJiDuData(code,year,jidu){
	let url=`http://money.finance.sina.com.cn/corp/go.php/vMS_MarketHistory/stockid/${code}.phtml?year=${year}&jidu=${jidu}`;
	console.log(`crawling  ${code} ${year}年${jidu}季度数据`);

	return new Promise(function(resolve,reject){

		superagent.get(url).end(function(error,resHtml){
			if(error){
				console.log(error);
				reject(error);
			}else{
				console.log(`craw  ${code} ${year}年${jidu}季度数据  success ! ! !`);
				var text=resHtml.text;
				var $=cheerio.load(text);
				var trs=$("#FundHoldSharesTable tbody tr");
				for(let i=1;i<trs.length;i++){
					var tr=trs.eq(i);
					var tds=tr.find("td");
					var time=tds.eq(0).find("a").html().trim();
					var open=tds.eq(1).find("div").html().trim();
					var high=tds.eq(2).find("div").html().trim();
					var now=tds.eq(3).find("div").html().trim();
					var low=tds.eq(4).find("div").html().trim();
					if(!historyData.timeColect[time]){
						historyData.timeColect[time]=true;
						historyData.count+=1;
						historyData.lists.push([time,open,high,low,now]);
						if(new Date(time)>new Date(historyData.end)){
							historyData.end=time;
						}
						if(new Date(time)<new Date(historyData.start)){
							historyData.start=time;
						}
					}
				}
				resolve(historyData);
			}
		});
	});
}


async function saveHistoryData(code){
	return new Promise(function(resolve,reject){
		StockModel.findBy({code:code},function(err,data){
			if(err){
				reject(err);
			}else{
				if(!data.historyData){
					StockModel.update({code:code},{
						$set:{
							historyData:historyData
						}
					},function(err){
						if(err){
							reject(err);
						}else{
							console.log(`${code} set historyData from ${historyData.start} to ${historyData.end} 历史数据成功！`)
							resolve(historyData);
						}
					});
				}else{
					var push=0;
					var pushStart="2090-01-01";
					

					for(let i=0;i<historyData.lists.length;i++){
						var dayData=historyData.lists[i];
						var time=dayData[0];
						if(!data.historyData.timeColect[time]){
							data.historyData.timeColect[time]=true;
							data.historyData.count+=1;
							data.historyData.lists.push(dayData);
							if(new Date(time)>new Date(data.historyData.end)){
								data.historyData.end=time;
								if(new Date(time)< new Date(pushStart)){
									pushStart=time;
								}
							}
							push+=1;
						}
					}
					StockModel.update({code:code},data,function(err){
						if(err){
							reject(err);
						}else{
							console.log(`${code} 共插入 from ${pushStart} to ${data.historyData.end}  ${push}条 historyData 历史数据成功！`)
							resolve(historyData);
						}
					});
				}
			}
		})
	});
	
}

function getJiDu(time){//获取当前是第几季度
	return Math.ceil(new Date(time).getMonth()/3);
}

function getYearJiDu(_time){
	let time=new Date(_time);
	return [time.getFullYear(),getJiDu(time)];
}


function createYearJiDu(time){
	let arr=[];

	var now=getYearJiDu(new Date());
	var now_year=now[0];
	var now_jidu=now[1];
	var history = time?getYearJiDu(new Date(time)):getYearJiDu( new Date()*1 - Max_year * 365*24*60*60*1000 );
	var history_year=history[0];
	var history_jidu=history[1];
	if(now_year==history_year){
		for(let jidu=history_jidu;jidu<=now_jidu;jidu++){
			arr.push([now_year,jidu]);
		}
	}else{
		for(let year=history_year;year<=now_year;year++){
			if(year==history_year&&year!=now_year){
				for(let jidu=history_jidu;jidu<=4;jidu++){
					arr.push([year,jidu]);
				}
			}else if(year<now_year){
				for(let jidu=1;jidu<=4;jidu++){
					arr.push([year,jidu]);
				}
			}else if(year==now_year){
				for(let jidu=1;jidu<=now_jidu;jidu++){
					arr.push([year,jidu]);
				}
			}
		}
	}
	
	return arr;//[[2016,4],[2017,1],[2017,2]]
}

