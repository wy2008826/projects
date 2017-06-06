var charset = require('superagent-charset');
var superagent = charset(require('superagent'));

var cheerio=require("cheerio");

var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称



let exist=0;
let save=0;
//通过generator函数可以实现任何级别的回调

let curPage=1;
let pageSize=80;
let count=3500;//股票总数量
let suit=0;

let pages=Math.round(count/pageSize);
let crawGen;
let saveGen;


module.exports=function(req,res,error){
	
	crawGen=crawPages(res);
	crawGen.next();//爬第一页
	
}

var lists=[];//满足要求的今天的股票


function* crawPages(res){
	for(let i=curPage;i<pages;i++){
		yield crawPage(i);
	}
	yield (function(){
		console.log("loaded all!","exists:"+exist,"save:"+save,"suit:"+suit,lists);
		res.json({
			r:1,
			lists
		});
	})();
}

function crawPage(page){
	let stockUrl=`http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,0,${page},${pageSize}]]&callback=fn`;

	let param={
		__s:[["hq","hs_a","",0,1,80]],
		callback:"fn"
	};
	console.log("loading "+page);
	superagent.get(stockUrl).end(function(error,resHtml){
		console.log("loaded "+page);
		var text=resHtml.text;
		var replaceTxt="/*<script>location.href='//sina.com';</script>*/fn(";

		var dataString=text.substring(replaceTxt.length+1,text.lastIndexOf(")"));
		var stockArr=JSON.parse(dataString)[0].items;
		// console.log(stockArr);
		
		saveGen=saveStocks(stockArr);
		saveGen.next();//保存第一条数据
		
		
	});
}

function* saveStocks(stockArr){
	for(let i=0;i<stockArr.length;i++){

		var _stock=stockArr[i];
		yield saveStock(_stock);
		
	}
	yield crawGen.next();//控制流程
}



function saveStock(_stock){
	var area=_stock[0].replace(/\d+/g,"");
	var code=_stock[1];
	var name=_stock[2];
	var yesterdayClose=_stock[8];//昨收
	var todayOpen=_stock[9];//
	var todayHigh=_stock[10];//
	var todayLow=_stock[11];//
	var now=_stock[3];//
	var nowData=[yesterdayClose,todayOpen,todayHigh,todayLow,now];
	if(isSuit(nowData)){
		lists.push(_stock);
	}
	console.log("code:"+code);

	StockModel.findBy({code:code},function(err,data){
		if(err){
			console.log(err);
			saveGen.next();
		}
		else{
			if(!data||data.length==0){
				var stock = new StockModel({//根据model生成数据实例
					area:area,
					code:code,
					name:name,
					nowData:nowData,
				});

				stock.save(function(err,data){
					if(err){
						console.log(err);
					}
					else{
						save+=1;
						console.log(`save ${code} success`);
					}
					saveGen.next();
				});
			}else{
				exist+=1;
				console.log(code+" exists");
				saveGen.next();
			}
		}
	});
}

//该算法判定单日的k线是T线  
// 先决条件 1.上涨趋势中 2.位于均线之上 3.大盘向好
// 操作   买定后  3日内如果没有突破坚决卖掉  如果第二天和第三天都是弱势坚决卖掉 

// 一定要敢于卖掉，因为这种策略每一天都会产生新的股票  不缺票


function isSuit(nowData){
	var [yesterdayClose,todayOpen,todayHigh,todayLow,now]=nowData;
	var height=todayHigh-todayLow;
	var zhenfu=height/todayLow;
	var openToLow=(todayOpen-todayLow)/height;
	var nowToLow=(now-todayLow)/height;

	var min=Math.min(openToLow,nowToLow);
	// console.log(zhenfu,openToLow,nowToLow);
	if(zhenfu>=0.06&&min>0.65){
		suit+=1;
		return true;
	}
	else{
		return false;
	}
}
