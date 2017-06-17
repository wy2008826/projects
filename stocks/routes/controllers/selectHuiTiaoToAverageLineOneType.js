
var calAverageLineData=require("../utils/calAverageLineData.js");
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称

let averLineDays=60;
let limit=15;//最近20日之内满足条件

module.exports= function(days=60,_limit=15){// days 回调至60日均线   _limit:最近多少天以内
	averLineDays=days;
	limit=_limit;
	const strategyName=`本地数据库查找 ${limit}日内 所有回调至 ${days}日 均线的股票`;

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
					// let isSuit=true;
					if(historyData && historyData.lists.length>days*1+limit){
						var historyRecently=historyData.lists.slice(historyData.lists.length-days*1-limit);

						let averageArr=calAverageLineData(historyRecently);
						
						
						if(recentCloseToAverageLine(historyRecently,averageArr) && earlyCloseToAverageLine(historyRecently,averageArr)){
							if(shape(historyRecently,averageArr)){
								suits.push({code,name});
							}
							
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
			}
			
		});
	});
}

//开始几天数据的满足条件 连续3天在支撑均线附近  这个地方条件不能太苛刻
function earlyCloseToAverageLine(historyRecently,averageArr){
	let recentData=historyRecently.slice(historyRecently.length-limit);
	let recentAver=averageArr.slice(averageArr.length-limit);
	let length=recentData.length;

	let isSuit=true;
	for(let i=0;i<3;i++){
		let data=recentData[i];
		let aver=recentAver[i];
		let minShiTi=Math.min(data[1],data[4]);
		let rate=Math.abs((minShiTi-aver[`_${averLineDays}`]) / aver[`_${averLineDays}`]);
		// console.log(data[4]-aver['_60'],aver['_60'],rate);
		if(rate>0.03){
			isSuit=false;
			break;
		}
	}
	return true;//这里的条件选择事可以优化的地方 直接返回true可以扩大选股范围
}

//末尾几天数据的满足条件  连续3天在支撑均线附近
function recentCloseToAverageLine(historyRecently,averageArr){
	let recentData=historyRecently.slice(historyRecently.length-limit);
	let recentAver=averageArr.slice(averageArr.length-limit);
	let length=recentData.length;

	let isSuit=true;
	for(let i=length-3;i<length;i++){
		let data=recentData[i];
		let aver=recentAver[i];
		let minShiTi=Math.min(data[1],data[4]);
		let rate=Math.abs((minShiTi-aver[`_${averLineDays}`]) / aver[`_${averLineDays}`]);
		if(rate>0.03){
			isSuit=false;
			break;
		}
	}
	return isSuit;
}


// 形态是否满足条件
function shape(historyRecently,averageArr){
	let recentData=historyRecently.slice(historyRecently.length-limit);
	let recentAver=averageArr.slice(averageArr.length-limit);
	let min=1000000;
	let max=-1000000;
	for(let i=0;i<recentData.length;i++){
		let data=recentData[i];
		let aver=recentAver[i];
		let minShiTi=Math.min(data[1],data[4]);
		let rate=(minShiTi-aver[`_${averLineDays}`]) / aver[`_${averLineDays}`];

		if(rate>max){
			max=rate;
		}
		if(rate<min){
			min=rate;
		}
	}


	return min<0.04 && min > -0.02 && max>0.15 && max<0.35;
	
}

