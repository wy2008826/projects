var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var fs=require("fs");
var path=require("path");
var cheerio=require("cheerio");

var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称

let dataObj={
	count:0,

};

let days=100;//抓取100天的数据
let milliseconds=days*24*60*60*1000;


let nowYearJiDu=getYearJiDu(new Date()*1);
let backYearJiDu=getYearJiDu(new Date()*1-milliseconds);


function getJiDu(time){//获取当前是第几季度
	return Math.ceil(new Date(time).getMonth()/3);
}

function getYearJiDu(_time){
	let time=new Date(_time);
	return [time.getFullYear(),getJiDu(time)];
}




let crawAllJiDuGen;

module.exports=function(req,res,error){
	dataObj={
		count:0,

	};
	var code=req.query.code||"000725";
	var yearLimit=req.query.yearLimit||2;
	crawAllJiDuGen=crawAllJiDu(code,yearLimit);
	crawAllJiDuGen.next();
}


function* crawAllJiDu(code,yearLimit){//默认拉取一年的数据 yearLimit：1
	yearLimit=yearLimit||1;
	code=code||"000725";
	var nowYear=new Date().getFullYear();
	var nowJiDu=getJiDu(new Date*1);
	var moveJiDu=nowJiDu;
	for(let i=nowYear-yearLimit;i<=nowYear;i++){
		// console.log(nowYear,nowJiDu);
		if(i<nowYear){
			for(let j=1;j<=4;j++){
				yield crawJiDuData(code,i,j);
			}
		}
		else{
			for(let j=1;j<=nowJiDu;j++){
				yield crawJiDuData(code,i,j);
			}
		}
	}

	var url=path.resolve(__dirname,"../../baseData/historyData/");
	fs.writeFile(url+`/${code}.json`,JSON.stringify(dataObj),"utf8",function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log(`写入 ${code} ${yearLimit}年历史数据成功 ! ! !`)
		}
	});
}

function crawJiDuData(code,year,jidu){
	let url=`http://money.finance.sina.com.cn/corp/go.php/vMS_MarketHistory/stockid/${code}.phtml?year=${year}&jidu=${jidu}`;
	console.log(`crawling  ${code} ${year}年${jidu}季度数据`);
	superagent.get(url).end(function(error,resHtml){
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
			if(!dataObj[time]){
				dataObj.count+=1;
				dataObj[time]={};
				dataObj[time].data=[open,high,low,now];
				dataObj[time].averageLine={

				};
			}
		}
		crawAllJiDuGen.next();

	});
}


