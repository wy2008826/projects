
var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称

const rootUrl="http://basic.10jqka.com.cn";

module.exports=function(req,res,error){
	var last=req.query.last*1||3;//持续增长季度数
	console.log(last);
	var resData={
		lists:[]
	};

	StockModel.find({},function(err,data){
		if(err){
			console.log(err)
		}else{

			data.forEach(function(stock,index){
				if(stock.finance&&stock.finance.simple){
					var finance=stock.finance.simple;
					var timeArr=finance[0].slice(0,last);
					var profitArr=finance[1].slice(0,last);
					profitArr1=profitArr.map(function(profit,ind){
						return toNumber(profit||"0");
					});

					var upgrade=true;
					for(let i=0;i<profitArr1.length-1;i++){
						if(profitArr1[i]<profitArr1[i+1]){
							upgrade=false;
						}
					}
					if(upgrade){
						resData.r=1;
						resData.lists.push({
							name:stock.companyName,
							code:stock.code,
							time:timeArr,
							profit:profitArr,
							href:rootUrl+"/"+stock.code+"/finance.html"
						});
					}
				}
			});

			res.json(resData);
		}
	})
}


function toNumber(str){
	var num=parseFloat(str);
	var unit=str.replace(/\-?\d+(\.\d+)?/g,"");
	var o={
		"":1,
		"千":1000,
		"万":10000,
		"千万":1000*10000,
		"亿":10000*10000,
		"十亿":10*10000*10000,
	}
	return num * o[unit];
}


