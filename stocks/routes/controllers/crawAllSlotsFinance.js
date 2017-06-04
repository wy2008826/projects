var charset = require('superagent-charset');
var superagent = charset(require('superagent'));

var cheerio=require("cheerio");

var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称



const rootUrl="http://basic.10jqka.com.cn";
let gen;

module.exports=function(req,res,error){
	var query=req.query;
	StockModel.find({},function(err,data){
		if(err){
			console.log(err)
		}else{
			gen=getAllSlotsFinance(data,res);
			gen.next();
			gen.next();
		}
	});
}

let exist=0;//
let update=0;//
let notfound=[];//

let time;
function* getAllSlotsFinance(arr,res){

	// arr=arr.slice(0,27);

	let startTime=(new Date()).getTime();
	for(let i=0;i<arr.length;i++){
		let area=arr[i];
		
		var lastData=yield getFinance(area.code);
	};
	let endTime=(new Date()).getTime();

	yield res.json({
		"r":"1",
		lists:lastData
	});

	yield console.log({
		exist:exist,
		update:update,
		notfound:notfound,
		time:((endTime-startTime) / 1000 /60) +" minutes"
	});
}


function getFinance(code){
	let url=rootUrl+"/"+code+"/finance.html";

	superagent.get(url).charset('gbk').end(function(error,resHtml){
		if(error){
			console.log("get "+url +" failed!")
		}else{
			console.log("loading "+url);
			var $=cheerio.load(resHtml.text);
			var dataHtml=$("body").eq(0).find("#benefit").html();
			if(dataHtml){
				dataHtml=dataHtml.replace(/\&quot;/g,"\"");
				var benefitData=JSON.parse(dataHtml);

				StockModel.findBy({code:code},function(err,data){
					if(err){
						console.log(err);
					}else{
						if(!data.finance||data.finance.simple[0].length!=benefitData.simple[0].length){
							data.finance=benefitData;
							StockModel.update({code:code},data,function(err,data){
								if(err){
									console.log("update failed:"+code);
								}
								else{
									update+=1;
									console.log("update success:"+code);
								}
							});
						}else{
							exist+=1;
							console.log("finance data exists:"+code);
						}

					}
				});
				gen.next(benefitData);
			}else{
				notfound.push(code);
			}
			
		}
	});
}


