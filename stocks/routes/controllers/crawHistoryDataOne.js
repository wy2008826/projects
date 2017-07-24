var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var fs=require("fs");
var path=require("path");
var cheerio=require("cheerio");

var mongoose=require("mongoose");


var StockModel=require("../../models/stock.js");


function getInitialHistoryData(){
	return {
		dataColects:{},
	};
}
let historyData=getInitialHistoryData();


const Max_year=0.75;

//要确爬取的顺序是按照时间从早到晚  如16年1季度  => 16年2季度  ... => 至今
//爬取的数据是按照季度内的时间进行处理  如16年第一季度   2016-1-1 =>  2016-1-2 => 2016-3-31
// 保证新老数据都按照次序依次插入数据库


module.exports=async function(code,time=undefined){
	historyData=getInitialHistoryData();

	var code=code||"600000";
	
	let yearJiduArr=createYearJiDu(time);
	for(let i=0;i<yearJiduArr.length;i++){
		let data=await crawJiDuData(code,yearJiduArr[i][0],yearJiduArr[i][1]).catch(async function(err){
			console.log(`---------craw ${yearJiduArr[i][0]} 年 ${yearJiduArr[i][1]} 季度数据出错 重试中。。。 ---------`)
			await crawJiDuData(code,yearJiduArr[i][0],yearJiduArr[i][1]).catch(function(err){
				console.log("-------  craw ${yearJiduArr[i][0]} 年 ${yearJiduArr[i][1]} 季度数据出错    不再尝试。。。 ---------")
			});//再次尝试
		});
		
	}
	
	await saveHistoryData(code).catch(function(err){
		console.log(`--------  保存 ${code}  历史数据失败 ---------!`)
	});
	// console.log(historyData)
}


async function crawJiDuData(code,year,jidu){
    // vMS_MarketHistory 除权  vMS_FuQuanMarketHistory：复权
	let url=`http://money.finance.sina.com.cn/corp/go.php/vMS_MarketHistory/stockid/${code}.phtml?year=${year}&jidu=${jidu}`;
	console.log(`crawling  ${code} ${year}年${jidu}季度数据`);

	return new Promise(function(resolve,reject){

		let sup=superagent.get(url).timeout({
			deadline:1000*10,//10s超时时间  超时之后不继续执行代码怎么破
			response:1000*10
		}).end(function(error,resHtml){
			if(error){
				console.log('error:');
				// sup.abort();
				reject(false);
			}else{
				console.log(`craw  ${code} ${year}年${jidu}季度数据  success ! ! !`);
				var text=resHtml.text;
				var $=cheerio.load(text);
				var trs=$("#FundHoldSharesTable tbody tr");
				for(let i=trs.length-1;i>=1;i--){//这里需要倒序，不然出来的历史数据的顺序是不对的

					var tr=trs.eq(i);
					var tds=tr.find("td");
					var time=(tds.eq(0).find("a").text()||' '.trim()).replace(/\s+|\n+|\t+|\r+/g,"");
					var open=tds.eq(1).find("div").html()||' '.trim();
					var high=tds.eq(2).find("div").html()||' '.trim();
					var now=tds.eq(3).find("div").html()||' '.trim();
					var low=tds.eq(4).find("div").html()||' '.trim();
					var num=tds.eq(5).find("div").html()||' '.trim();
					var money=tds.eq(6).find("div").html()||' '.trim();

					if(!historyData.dataColects[time]&&time){
						historyData.dataColects[time]=[time,open,high,low,now,num,money];
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
				if(!data.historyData){//数据库中没有历史数据
					StockModel.update({code:code},{
						$set:{
							historyData:historyData
						}
					},function(err){
						if(err){
							reject(err);
						}else{
							let {start,end}=getStartAndEnd(historyData.dataColects);
							console.log(`${code} set historyData from ${start} to ${end} 历史数据成功！`)
							resolve(historyData);
						}
					});
				}else{//数据库中存在历史数据
					var push=0;
					

					Object.keys(historyData.dataColects).forEach(function(timeKey,index){
						var dayData=historyData.dataColects[timeKey];
						var time=dayData[0];
						data.historyData.dataColects[time]=dayData;
						if(!data.historyData.dataColects[time]&&time){
							push+=1;
						}
					});
					let {start,end,sortTimes}=getStartAndEnd(data.historyData.dataColects);

					let sortedDataColects={};//对插入的数据重新排序 保证顺序的正确性
					for(let i=0;i<sortTimes.length;i++){
						const time=sortTimes[i];
						sortedDataColects[time]=data.historyData.dataColects[time];
					}
					data.historyData.dataColects=sortedDataColects;

					StockModel.update({code:code},data,function(err){
						if(err){
							reject(err);
						}else{
							console.log(`${code} 共插入 from ${start} to ${end}  ${push}条 historyData 历史数据成功！`)
							resolve(historyData);
						}
					});
				}
			}
		})
	});
	
}

function getStartAndEnd(timeColects){
	let times=Object.keys(timeColects);
	times=times.sort(function(prev,next){
		return new Date(prev)-new Date(next);
	});
	const start=times[0];
	const end=times[times.length-1];
	return {
		sortTimes:times,
		start,
		end
	}
}

function getJiDu(time){//获取当前是第几季度
	return Math.ceil((new Date(time).getMonth()+1)/3);
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

