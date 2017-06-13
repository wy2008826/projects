
let crawAllSlotsAndSearchOneDayT =require("../routes/controllers/crawAllSlotsAndSearchOneDayT.js");
let schedule = require("node-schedule");

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = 14;
rule.minute = 48;


module.exports=function(){
	let j = schedule.scheduleJob(rule, function(){
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