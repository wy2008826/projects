
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");

var getSortHistoryData=require('../utils/getSortHistoryData.js');
let calAverageLineData=require("../utils/calAverageLineData.js");
let calProfitFromOneDay=require("../utils/calProfitFromOneDay.js");
let calMaxMinFromStartToEnd=require("../utils/calMaxMinFromStartToEnd.js");


module.exports= function(){
	
	const strategyName=`本地数据库查找均线粘连的股票`;
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

                let code=codes[i].code;
                let reg=/^300\d+/;

                if(reg.test(code)){//排除创业板的股票
                    continue;
                }
				let query=StockModel.findOne({code:codes[i].code});
				let suit=await searchOneCodeAverageClose(query);
				if(suit){
					suits=suits.concat(suit);
				}
			}


			let end=new Date();
			let minutes=( (end-start) / (1000 * 60 ) );
			console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);

			let num=0;
			let diepo=0;
			let notDiePo=[];
			let shibai=[];
			for(let i=0;i<suits.length;i++){
				if(suits[i].rate30>12){
                    num+=1;
				}
                if(suits[i].diePo){
                    diepo+=1;
                }else{
                    notDiePo.push(suits[i]);
				}
				if(suits[i].diePo&&suits[i].rate30<5){
                    shibai.push(suits[i]);
				}
			}
            console.log(suits.length,num,notDiePo);
			resolve(suits);
		};
	});
}

function searchOneCodeAverageClose(query){
	return new Promise(function(resolve,reject){
		return query.exec(async function(err,stock){
			if(err){
				console.log("find err:",err)
				reject(err);
			}else{
				
				let code=stock.code;
				let name=stock.name;
				let historyData=getSortHistoryData(stock.historyData.dataColects);
				let hisLength=historyData.length;
				if(historyData && hisLength>=60){
					let suits=[];
					let averageData=calAverageLineData(historyData);

					for(let i=60;i<hisLength;i++){
						let {_5,_10,_20,_30,_60}=averageData[i];
						let [buyTime,open,hign,low,close]=historyData[i];

						let max_aver=Math.max.apply(null,[_5,_10,_20,_30,_60]);
						let min_aver=Math.min.apply(null,[_5,_10,_20,_30,_60]);
						let {rate6,rate12,rate20,rate30}=calProfitFromOneDay(i,historyData);
						const isAverageClose=(max_aver-min_aver)/min_aver<0.03;
						const zhenfuIsBig=(close-open)/open>=0.04;
						const openCloseToAverMax=(Math.abs(open-max_aver))/max_aver<0.03;
						const hasNoShangYing=(hign-close)/close<0.008;
                        const maxMin=calMaxMinFromStartToEnd(i+1,i+31,historyData);
						// console.log();
						if( isAverageClose && zhenfuIsBig && openCloseToAverMax &&hasNoShangYing){
							suits.push({
								code,
								name,
								buyTime,
								rate6,
								rate12,
								rate20,
								rate30,
								diePo:maxMin.min<close
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

function nextDaysUp(i,averageData){
	return averageData[i+1]['_5']<averageData[i+2]['_5']&&averageData[i+2]['_5']<averageData[i+3]['_5']
}


