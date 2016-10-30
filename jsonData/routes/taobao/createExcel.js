var excel=require("node-xlsx");
var mongoose=require("mongoose");
var fs=require("fs");
var ShopModel=require("../../models/taobao/shop.js");
mongoose.connect("127.0.0.1:27017/shopList");


ShopModel.fetch(function(error,data){
	console.log("fetching data!");

	
	var objData=[];
	objData.push(["关键词","店家昵称","总销量","价格1","价格2","价格3","价格4"]);
	var searchParam;
	data.forEach(function(shop,index){
		var shopData=[shop.search,shop.nickName,shop.totalsold];
		searchParam=shop.search;
		shop.tuijianArr.forEach(function(tuijian,i){
			shopData.push(tuijian.price);
		});
		objData.push(shopData);
	});


  	// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
	var buffer = excel.build([{name: "mySheetName", data: objData}]);

	fs.writeFileSync('./'+searchParam+'.xlsx', buffer, 'binary',function(err){
		if(err){

		}
		else{
			console.log("生成表格数据成功！");
		}
	});

});



