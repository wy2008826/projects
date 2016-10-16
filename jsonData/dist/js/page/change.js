var fs=require("fs");

var dataPath="./data/output.json";

var input=fs.createReadStream(dataPath);



var readData="";

input.on("data",function(data){
	// out.write(data);
	readData+=data;
});


input.on("end",function(){
	var data=JSON.parse(readData);
	data.loupanList[0]["name"]="change";
	console.log(readData);
	
	fs.writeFile("./data/changed.json", JSON.stringify(data),{encoding:"utf8"},function(err){
		if (err) throw err;
		console.log('文件写入成功');
	})
});




