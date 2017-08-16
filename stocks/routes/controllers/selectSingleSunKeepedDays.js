
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称
let sendEmail=require("../utils/sendEmail.js");

let prevDays=90;
let isSingleSunKeepd=require("../../strategy/isSingleSunKeepd.js");
let getSortHistoryData=require('../utils/getSortHistoryData.js');
let calProfitFromOneDay=require("../utils/calProfitFromOneDay.js");
let calAverageLineData=require("../utils/calAverageLineData.js");

/** 参考因素 

	1.阳线之前k线的形态  如阳线不能低开
	2.阳线于60日均线的关系   阳线开盘价距离60日均线的涨幅百分比不能超过10%
	3.窄幅震荡的5日内 不能有较长的长上下影线
	4.阳线的成交量显著放量
	5.不能处于历史走势中的绝对高位
	6.大阳线不能有太长的上影线


 	大阳线本身需要具有某种特殊意义
	a 大阳需要突破前期一段时间的最高点
 	b 大阳线一举突破所有的均线
**/


/** 失败记录 

1.阳线低开
2.阳线远高于60日均线
3.满足所有条件  但出于相对历史高位
4.
	
**/

module.exports= function(needEmail){// 
	
	const strategyName=`本地数据库查找单阳不破的股票`;
	return new Promise(async function(resolve,reject){
		let start=new Date();
		let suits=[];
		
		let Query=StockModel.find({},["code"]);
		let codes;
		let count=await Query.then(function(docs){
			codes=docs;
			return docs.length||0;
		});

		if(!count){
			reject("find local database error");
		}else{
			console.log(`finding.......${strategyName}`);
			for(let i=0;i<count;i++){//需要对数据进行拆分，不然会导致内存泄漏
				let query=StockModel.findOne({code:codes[i].code});
				let suit=await searchGroups(query);
				if(suit){
					suits=suits.concat(suit);
				}
			}


			let end=new Date();
			let minutes=( (end-start) / (1000 * 60 ) );
			console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);
			console.log(suits);
			resolve(suits);

			if(needEmail){//是否需要发邮件
				const html=createEmailText(suits);
				console.log(html)
				await sendEmail(html,"single sun keeped days!!");
			}
			
		};


	});
}

function searchGroups(query){
	return new Promise(function(resolve,reject){
		return query.exec(async function(err,stock){
			if(err){
				console.log("find err:",err)
				reject(err);
			}else{
				
				let code=stock.code;
				let name=stock.name;
				let historyData=getSortHistoryData(stock.historyData.dataColects);
                let averLineData=calAverageLineData(historyData);
				let hisLength=historyData.length;
				if(historyData && hisLength>prevDays+6){
					let suits=[];
					for(let i=hisLength;i>hisLength-prevDays;i--){
						var recentData=historyData.slice(i-7,i);
						const low=historyData[i-5][3];
                        const close=historyData[i-5][4];

						const {_5,_10,_20,_30,_60}=averLineData[i-5];
                        const minAver=Math.min.apply(null,[_5,_10,_20,_30])
						const maxAver=Math.max.apply(null,[_5,_10,_20,_30])
						const averMinMaxRate=(maxAver-minAver)/low;

						var result=isSingleSunKeepd(recentData);

						if(result.isSuit){
							let rates=calProfitFromOneDay(i-1,historyData);
							// console.log(code,historyData[i-6],averLineData[i-6]);
							console.log(averMinMaxRate);
							suits.push({
								code,name,
								buyTime:result.buyTime,
								rate3:rates.rate3,
								rate6:rates.rate6,
								rate9:rates.rate9,
								rate12:rates.rate12,
								isTuPo:close>maxAver&&averMinMaxRate<0.03
							});
						}
					}
					resolve(suits);
				}
				resolve(false);
			}
		});
	});
}

function createEmailText(suits){
	let html="<ul>";
	suits.forEach(function(item,index){
		html+=item.name+":"+item.code+"<br/>";
	});
	html+="</ul>";
	return html;
}

