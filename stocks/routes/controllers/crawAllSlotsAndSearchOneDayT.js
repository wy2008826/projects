let charset = require('superagent-charset');
let superagent = charset(require('superagent'));
let fs=require("fs");
let path=require("path");
let cheerio=require("cheerio");
let mongoose=require("mongoose");

let StockModel=require("../../models/stock.js");

let isOneDayT=require("../../strategy/isOneDayT.js");
let sendEmail=require("../utils/sendEmail.js");
let sleep=require('../utils/sleep.js');


let exist=0;
let save=0;
let suit=0;
//通过generator函数可以实现任何级别的回调



let suits=[];//满足要求的今天的股票
let codesObj=[]


module.exports= async function crawAllSlotsAndSearchOneDayT(needEmail){
	suits=[];
	codesObj=[];

	let curPage=1;
	let pageSize=80;
	let count=3500;//股票总数量


	let pages=Math.round(count/pageSize);

	for(let i=curPage;i<pages;i++){
		let pageStocks = await crawPage(i,pageSize).catch(function(err){
			console.log(`----- craw page ${i} 代码列表失败 -------!`);
		});

		if(pageStocks&&pageStocks.stockArray&&pageStocks.stockArray.length>0){
			let pageTongJi=await savePageStocks(pageStocks.stockArray,i,pageStocks.day).catch(function(err){
				console.log(`----- save page ${i} 代码列表失败 -------!`);
			});
		}
		//await sleep(10000);
	}
	await writeCodeFile();

	// console.log(suits);
	return suits;

}


async function crawPage(page,pageSize){
	let stockUrl=`http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%22%22,0,${page},${pageSize}]]&callback=fn`;

	console.log("loading "+page);
	
	return new Promise(function(resolve,reject){

		try{
            superagent.get(stockUrl).end(function(error,resHtml){
                if(error){
                    console.log(`-------  load ${page} failed ------- !`);
                    resolve(false);
                }else{
                    console.log("loaded "+page);
                    var text=resHtml.text;
                    var replaceTxt="/*<script>location.href='//sina.com';</script>*/fn(";

                    var dataString=text.substring(replaceTxt.length+1,text.lastIndexOf(")"));
                    var stock=JSON.parse(dataString)[0];
                    resolve({
                        day:stock.day,
                        stockArray:stock.items
                    });
                }

            });
		}catch(e){
            console.log('erro');
			resolve(false)
		}

	}).catch(function (e) {
		console.log('catch error');
    });
}


async function savePageStocks(stockArr,i,day){
	let save=0;
	let exists=0;
	let saves=[];
	
	for(let i=0;i<stockArr.length;i++){
		let _stock=stockArr[i];
        var code=_stock[1];
        let reg=/^300\d{3}$/;
		if(reg.test(code)){
			continue;
		}
		let codeStatus = await saveStock(_stock,day).catch(function(err){
			console.log(`------- save stocks failed -------`);
		});
		if(codeStatus.save){
			save+=1;
			saves.push({code,name}=codeStatus);
		}
		if(codeStatus.exists){
            exists+=1
		}
	}

	console.log(`第 ${i} 页本地存在 ${exists} 条数据，保存 ${save} 条新数据`);
	console.log("        👇 👇 👇        ");
}

function saveStock(_stock,day){
	var area=_stock[0].replace(/\d+/g,"");
	var code=_stock[1];
	var name=_stock[2];
	// var yesterdayClose=_stock[8];//昨收
	var todayOpen=_stock[9];//
	var todayHigh=_stock[10];//
	var todayLow=_stock[11];//
	var now=_stock[3];//
	var num=_stock[12];//
	var money=_stock[13];//
	var time=_stock[14];//14:25:23
	if(time.split(':')[0]<15){
        day=getCurDayTime();
	}
	const dayTime=`${day} ${time}`;

	var nowData=[dayTime,todayOpen,todayHigh,todayLow,now,num,money];
	var nowHistoryData=[day,todayOpen,todayHigh,todayLow,now,num,money];
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
					if(data.historyData){
						if(todayOpen*1 && time.split(':')[0]<15){//最新数据那天没有停牌 并且时间在收盘前
							if(!data.historyData.dataColects[day]){
								data.historyData.count+=1;
								data.historyData.end=day;
							}
							data.historyData.dataColects[day]=nowHistoryData;
						}
					}
					StockModel.update({code:code},{
						$set:{
							nowData:nowData,
							historyData:data.historyData
						}
					},function(err){
						if(err){
							reject(err);
						}else{
							resolve({exists:1});
						}
					});
				}
			}
		});
	}).catch(function(){
		console.log(`save ${code} failed`);
        return {save:false,code,name}
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

function getCurDayTime(){
	const now=new Date();
	let year=now.getFullYear();
	let month=now.getMonth()+1;
	let day=now.getDate();
	if(month<10){
        month='0'+month;
	}
    if(day<10){
        day='0'+day;
    }
    return `${year}-${month}-${day}`
}