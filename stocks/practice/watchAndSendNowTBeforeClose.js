
let crawAllSlotsAndSearchOneDayT =require("../routes/controllers/crawAllSlotsAndSearchOneDayT.js");
let schedule = require("node-schedule");



module.exports=function(){
	let rule0 = {
		dayOfWeek:[1,2,3,4,5],
		hour:[11],
		minute:[25]
	};

	let rule1 = {
		dayOfWeek:[1,2,3,4,5],
		hour:[14],
		minute:[50]
	};
	let i = schedule.scheduleJob(rule0, function(){
		crawAllSlotsAndSearchOneDayT(undefined,undefined,"email");
	});

	let j = schedule.scheduleJob(rule1, function(){
		crawAllSlotsAndSearchOneDayT(undefined,undefined,"email");
	});
}

// module.exports=function(){
// 	setInterval(function(){
// 		var now =new Date();
// 		var day=now.getDay();//星期几
// 		var hours=now.getHours();
// 		var minutes=now.getMinutes();

// 		if(day!=6||day!=0){//非周末
// 			if(hours==21&&minutes==9){
// 				crawAllSlotsAndSearchOneDayT(undefined,undefined,"email");
// 			}
// 		}
// 	},1000*58);
// }