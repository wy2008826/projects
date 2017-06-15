let charset = require('superagent-charset');
let superagent = charset(require('superagent'));
let fs=require("fs");
let path=require("path");
let cheerio=require("cheerio");

let mongoose=require("mongoose");

let StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称

let isOneDayT=require("../../strategy/isOneDayT.js");
let sendEmail=require("../utils/sendEmail.js");


let exist=0;
let save=0;
let suit=0;
//通过generator函数可以实现任何级别的回调



let suits=[];//满足要求的今天的股票
let codesObj=[]


module.exports= async function crawAllSlotsAndSearchOneDayT(){
	suits=[];
	codesObj=[];

	let curPage=1;
	let pageSize=80;
	let count=3500;//股票总数量


	let pages=Math.round(count/pageSize);

	for(let i=curPage;i<pages;i++){
		let pageStocks = await crawPage(i,pageSize);
		let pageTongJi=await savePageStocks(pageStocks,i);
	}
	await writeCodeFile();

	const html=createEmailText();
	await sendEmail(html);
}


async function crawPage(page,pageSize){
	let stockUrl=`http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,0,${page},${pageSize}]]&callback=fn`;

	console.log("loading "+page);
	
	return new Promise(function(resolve,reject){
		superagent.get(stockUrl).end(function(error,resHtml){
			console.log("loaded "+page);
			var text=resHtml.text;
			var replaceTxt="/*<script>location.href='//sina.com';</script>*/fn(";

			var dataString=text.substring(replaceTxt.length+1,text.lastIndexOf(")"));
			var stockArr=JSON.parse(dataString)[0].items;
			resolve(stockArr);
			
		});
	});
}


async function savePageStocks(stockArr,i){
	let save=0;
	let exists=0;
	let saves=[];
	for(let i=0;i<stockArr.length;i++){
		let _stock=stockArr[i];
		let codeStatus = await saveStock(_stock);
		if(codeStatus.save){
			save+=1;
			saves.push({code,name}=codeStatus);
		}
		codeStatus.exists && (exists+=1) ;
	}

	console.log(`第 ${i} 页存在 ${exists} 条数据，保存 ${save} 条新数据`);
	console.log("        👇 👇 👇        ");
}

function saveStock(_stock){
	var area=_stock[0].replace(/\d+/g,"");
	var code=_stock[1];
	var name=_stock[2];
	// var yesterdayClose=_stock[8];//昨收
	var todayOpen=_stock[9];//
	var todayHigh=_stock[10];//
	var todayLow=_stock[11];//
	var now=_stock[3];//
	var nowData=[todayOpen,todayHigh,todayLow,now];
	if(isOneDayT(nowData)){
		suit+=1;
		suits.push({
			code:code,
			name:name
		});
	}
	codesObj.push({
		code:code,
		name:name
	});
	return new Promise(function(resolve,reject){

		StockModel.findBy({code:code},function(err,data){
			if(err){
				console.log(err);
				reject(err);
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
							reject(err);
						}
						else{
							save+=1;
							console.log(`save ${code} success`);
							resolve({save:1,code,name});
						}
					});
				}else{
					exist+=1;
					resolve({exists:1});
				}
			}
		});
	});
}

async function writeCodeFile(){
	var url=path.resolve(__dirname,"../../baseData/");

	return new Promise(function(resolve,reject){
		fs.writeFile(url+`/codes.json`,JSON.stringify(codesObj),"utf8",function(err,data){
			if(err){
				console.log(err);
				reject(err);
			}else{
				console.log(`收集并写入所有股票代码成功   共计${codesObj.length} 条! ! !`);
				resolve();
			}
		});
	});
}

function createEmailText(){
	let html="<ul>";
	suits.forEach(function(item,index){
		html+=item.name+":"+item.code+"<br/>";
	});
	html+="</ul>";
	return html;
}

