
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称
let sendEmail=require("../utils/sendEmail.js");

let maxDaysKeep=15;
let isSingleSunKeepd=require("../../strategy/isSingleSunKeepd.js");


module.exports= function(needEmail){// 
	
	const strategyName=`本地数据库查找单阳不破的股票`;

	return new Promise(function(resolve,reject){
		let start=new Date();
		
		let suits=[];
		
		console.log(`finding.......${strategyName}`);
		StockModel.count({},async function(err,count){
			if(err){
				reject("本地数据库查找失败！");
			}else{
				let step=100;
				for(let i=0;i<count;i+=step){//需要对数据进行拆分，不然会导致内存泄漏
					let query=StockModel.find({});
					query.skip(i);
					query.limit(step);
					await searchGroups(query);

				}
				let end=new Date();
				let minutes=( (end-start) / (1000 * 60 ) );
				console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);
				console.log(suits);
				resolve(suits);
				try{
					if(needEmail){//是否需要发邮件
						const html=createEmailText(suits);
						console.log(html)
						await sendEmail(html,"single sun keeped days!!");
					}
					
				}catch(e){
					console.log("catch e:",e)
				}
			}
		});
	});
}

function searchGroups(query){
	return new Promise(function(resolve,reject){
		query.exec(async function(err,stocks){
			if(err){
				console.log("find err:",err)
				reject(err);
			}else{

				for(let i=0;i<stocks.length;i++){//计算所有的股票当前是否满足条件
					
					let stock=stocks[i];
					let code=stock.code;
					let name=stock.name;
					let historyData=stock.historyData;
					
					if(historyData && historyData.lists.length>maxDaysKeep+3){
						var recentData=historyData.lists.slice(historyData.lists.length-maxDaysKeep-3);

						var result=isSingleSunKeepd(recentData);
						if(result.isSuit){
							suits.push({code,name,buyTime:result.buyTime});
						}
					}
				}
				resolve();
				
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

