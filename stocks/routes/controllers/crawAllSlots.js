var charset = require('superagent-charset');
var superagent = charset(require('superagent'));

var cheerio=require("cheerio");

var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");
mongoose.connect("127.0.0.1:27017/stock");// elevator 具体的库名称



const rootUrl="http://basic.10jqka.com.cn";
let areaArr=[];//板块
let slotObj={};
let slotArr=[];//股票列表
let data={};
let gen;

module.exports=function(req,res,error){
	var query=req.query;

	superagent.get(rootUrl).charset('gbk').end(function(error,resHtml){

		var $=cheerio.load(resHtml.text);

		
		$("body").eq(0).find(".c_content").each(function(index,aWraper){
			$(aWraper).find("a").each(function(i,a){
				var $a=$(a);
				var name=$a.attr("title");
				var code=$a.attr("name");
				var href=$a.attr("href");
				areaArr.push({
					"name":name,
					"code":code,
					"href":href
				});
				
			});
			
		});
		
		gen=getAreaSlots(areaArr,res);
		gen.next();
		
	});
}

function* getAreaSlots(arr,res){
	for(var i=0;i<arr.length;i++){
		var area=arr[i];
		var url=rootUrl+area.href;
		data[area.code]={lists:[]};
		yield getSlot(url,area.code);
	};

	yield res.json({
		"code":"1",
		"lists":areaArr,
		"slots":slotArr,
		"data":data
	});
}

function getSlot(url,areaCode){
	var slotsUrl=url;
	superagent.get(slotsUrl).charset('gbk').end(function(error,resHtml){
		if(error){
			console.log(error)
		}else{
			console.log("loading "+url);
			var $=cheerio.load(resHtml.text);
			$("body").eq(0).find(".c_content a").each(function(index,a){
				var $a=$(a);
				var name=$a.attr("title");
				var href=$a.attr("href");
				var code=href.replace(/\//g,"");

				var o={
					"code":code,
					"name":name
				};
				if(!slotObj[code]){
					slotObj[code]=true;
					slotArr.push(o);
					data[areaCode].lists.push(o);

					var stock = new StockModel({//根据model生成数据实例
						code:code,
						companyName:name
					});
					StockModel.findBy({code:code},function(err,data){
						if(err){
							console.log(err);
						}
						else{
							if(!data||data.length==0){
								stock.save(function(err,data){
									if(err){
										console.log(err);
									}
									else{
										console.log("save success")
									}
								});
							}
						}
					});
				}
			});
			gen.next();
		}
	});
}