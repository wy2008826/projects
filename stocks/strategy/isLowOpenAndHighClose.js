

//该算法判定前一日为下跌k线，而当日是低开高走的股票


function isLowOpenAndHignClose(recentData){
	let prev=recentData[0];
	let today=recentData[1];

	var [prev_time,prev_open,prev_high,prev_low,prev_now]=prev;
	var [today_time,today_open,today_high,today_low,today_now]=today;
	if(isFall(prev)&&isUp(today)&&today_open<prev_now){
		return {
			isSuit:true,
			buyTime:today_time
		}
	}
	return {
		isSuit:false,
	};
}

function isFall(data){
	let [time,open,high,low,now]=data;
	return now<open*0.99;
}

function isUp(data){
	let [time,open,high,low,now]=data;
	return now>open*1.005;
}

module.exports=isLowOpenAndHignClose;