
var StockModel=require("../../../models/stock.js");
let stocks;

module.exports=async function(page=0,pageSize=100){
	return new Promise(async function(resolve,reject){
		if(!stocks){
			let Query=StockModel.find({},["code","name"]);
			Query.exec(function(err,stocks){
				if(err){
					console.log("find err:",err)
					reject(err);
				}else{
					let length=stocks.length;
					let all=[];
					for(let i=0;i<length;i++){
						let stock=stocks[i];
						all.push({
							code:stock["code"],
							name:stock["name"]
						});
					}
					stocks=all;
					resolve(all);
				}
			});
		}else{
			resolve(stocks);
		}
		
		// let Query=StockModel.find({});
		// let count=await Query.then(function(docs){
		// 	return docs.length||0;
		// });
		
		// if(!count){
		// 	reject("find local database error");
		// }else{
		// 	let step=pageSize;
		// 	let result=[];
		// 	let i=page * pageSize;

		// 	let query=StockModel.find({});
		// 	query.skip(i);
		// 	query.limit(step);
		// 	let group=await crawGroups(query);
		// 	if(group){
		// 		result=result.concat(group);
		// 	}
			
		// 	resolve(result);
		// }


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
				
				let all=[];
				for(let i=0;i<length;i++){
					let stock=stocks[i];
					all.push({
						code:stock["code"],
						name:stock["name"]
					});
				}
				resolve(all);
			}
		});
	});
}

