var fs=require('fs');

var data={
	result:true,
	loupanList:[
		
	]
};

var item={
			"name":"楼盘1",
			"area":"西湖区",
			"index":1,
			"subLoupan":[
				
			]
		};

for(var i=0;i<50;i++){
	item.index+=1;
	data.loupanList.push(item);
}

fs.writeFileSync('./data/output.json',JSON.stringify(data));


// var JsonObj=JSON.parse(fs.readFileSync('./output.json'));
// console.log(JsonObj);

var da=fs.readFileSync("./data/a.json");
console.log(Buffer.parse(da));
