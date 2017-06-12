
let crawAllSlotsAndSearchOneDayT =require("../routes/controllers/crawAllSlotsAndSearchOneDayT.js");


module.exports=function(){
	setInterval(function(){
		var now =new Date();
		var day=now.getDay();//星期几
		var hours=now.getHours();
		var minutes=now.getMinutes();


		if(day!=6||day!=0){//非周末
			if(hours==21&&minutes==33){
				crawAllSlotsAndSearchOneDayT(undefined,undefined,"email");
			}
		}
	},1000*30);
}