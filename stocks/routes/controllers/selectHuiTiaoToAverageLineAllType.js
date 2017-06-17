let selectHuiTiaoToAverageLineOneType=require("./selectHuiTiaoToAverageLineOneType");

let sendEmail=require("../utils/sendEmail.js");



module.exports=async function(){
	let start=new Date();
	let averDays=[30,40,50,60];
	let ret={};
	//  ret like {
	//  	"600000":{
	//  		name:"浦发银行",
	// 			_30:true,
	// 			_40:true
	//  	}
	//  }
	for(let i=0;i<averDays.length;i++){
		let averDayCount=averDays[i];
		for(let limit=15;limit<45;limit++){
			let result= await selectHuiTiaoToAverageLineOneType(averDayCount,limit);
			for(let j=0;j<result.suits.length;j++){
				let store=result.suits[j];
				if(!ret[store.code]){
					ret[store.code]={
						name:store.name,
					};
					ret[store.code][`_${averDayCount}`]=true;
				}else{
					ret[store.code][`_${averDayCount}`]=true;
				}
			}
		}
	}

	let end=new Date();
	let minutes=( (end-start) / (1000 * 60 ) );
	console.log(`本地查找 15至35天间 分别回调至 30、40、50、60日均线处的股票 success！！ 共耗时 ${minutes} 分钟`);
	console.log("ret:",ret);

	const html=createEmailText(ret);
	await sendEmail(html,"reback to 60 average line !");
}


function createEmailText(ret){//靠近60日均线必须参考  如果 30  40 50 出现共振  也加上去
	let html="<ul>";
	Object.keys(ret).forEach(function(code,index){
		if(ret[code]["_60"]){
			html+=`<li>${code}:${ret[code].name} --- _60</li>`;
		}else{
			if(ret[code]["_30"]&&ret[code]["_40"]&&ret[code]["_50"]){
				html+=`<li>${code}:${ret[code].name} --- _30 _40 _50共振</li>`;
			}
		}
	});
	
	html+="</ul>";
	return html;
}

