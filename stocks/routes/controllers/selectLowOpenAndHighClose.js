
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");

var getSortHistoryData=require('../utils/getSortHistoryData.js');
let isLowOpenAndHighClose=require("../../strategy/isLowOpenAndHighClose.js");


module.exports= function(needEmail){// 
	
	const strategyName=`本地数据库查找低开高走的股票`;
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
				let suit=await testStock(query);
				if(suit){
					suits.push(suit);
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

function testStock(query){
	return new Promise(function(resolve,reject){
		return query.exec(async function(err,stock){
			if(err){
				console.log("find err:",err)
				reject(err);
			}else{
				
				let code=stock.code;
				let name=stock.name;
				let historyData=getSortHistoryData(stock.historyData.dataColects);
				if(historyData && historyData.length>1){
					var recentData=historyData.slice(historyData.length-2);

					var result=isLowOpenAndHighClose(recentData);
					if(result.isSuit){
						resolve({code,name,buyTime:result.buyTime});
					}
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

