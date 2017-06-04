var express=require("express");
var router=express.Router();
var path=require("path");

var superagent=require("superagent");//ajax来使用http 发起get请求  返回数据
var cheerio=require("cheerio");
var eventproxy=require("eventproxy");
var mongoose=require("mongoose");


var ShopModel=require("../../models/taobao/shop.js");
mongoose.connect("127.0.0.1:27017/shopList");


router.get("/",function(req,res){
	// res.render("taobao/search",{title:"抓取任意网站数据"});
	// getData("女鞋",0,res);

});

var startPage=0;//开始的页码

var currentPage=startPage;
var searchPageCount=20;//查询的总页码数

var pageSize=20;
var param="女装";//查询关键词
var currentCount=currentPage*pageSize;

var startCount=currentPage*pageSize;
getData(param,currentCount);

function getData(param,n){

	var url="https://shopsearch.taobao.com/search?app=shopsearch&q="+param+"&js=1&initiative_id=staobaoz_20161029&ie=utf8&sort=sale-desc&isb=0&shop_type=&ratesum=11%2C15&s="+n;
	superagent.get(url).end(function(error,resHtml){
		console.log("获取 "+param+"  第"+currentPage+"页数据！");
		var $=cheerio.load(resHtml.text);
		var reg=/g_page_config\s=\s(\{\"pageName[\s\S]*)\;[\s\S]*g_srp_loadCss/;
		var shopDataStr=resHtml.text.match(reg)[1];
		var jsonData=JSON.parse(shopDataStr);
		var dataLength=jsonData.mods.shoplist.data.shopItems.length;
		var arr=[];
		try{
			jsonData.mods.shoplist.data.shopItems.forEach(function(item,index){
				var shopItem={
					search:param,
					nickName:item.nick,//卖家昵称
					totalsold:item.totalsold,//销量
					tuijianArr:[]//推荐商品列表
				};
				item.auctionsInshop.forEach(function(tuijianItem,ind){//推荐商品
					var tuijianData={
						price:tuijianItem.price
					};
					shopItem.tuijianArr.push(tuijianData);
				});
				_shop= new ShopModel(shopItem);
				_shop.save(function(err,data){
					if(err){
						console.log("保存数据失败 ",err);
					}
					else{
						console.log("save shop :"+shopItem.nickName+" successfull!");
						if(index==19){
							if(currentPage<startPage+searchPageCount){
								getData(param,currentCount);
							}
							else{
								console.log("成功存储: "+param+"  第"+startPage+"页至第"+searchPageCount+"页的数据！棒棒哒。。。");
							}
							currentPage+=1;
							currentCount=currentPage*pageSize;
						}
					}
				});


			});
		}
		catch(error){
			console.log("error:",jsonData.mods.shoplist);
		}
		// console.log(arr);
		if(currentPage>=searchPageCount){
			console.log("搜索并存储完毕！");
		}
	});

}


module.exports=router;