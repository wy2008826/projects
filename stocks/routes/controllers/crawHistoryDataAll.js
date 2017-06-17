

let crawHistoryDataOne=require("./crawHistoryDataOne.js");
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称


module.exports=async function(){
	let begain=new Date();
	StockModel.find({},async function(err,stocks){
		for(let i=0;i<stocks.length;i++){
			
			let stock=stocks[i];
			let code=stock.code;
			let historyData=stock.historyData;
			let start;
			
			if(historyData){
				start=historyData.end;
			}
			await crawHistoryDataOne(code,start);
		
		}
		let end=new Date();
		let minutes=( (end-begain) / (1000 * 60 ) );
		console.log(`loaded all historyData 😊 !!! 共耗时 ${minutes} 分钟`)
	});
}
