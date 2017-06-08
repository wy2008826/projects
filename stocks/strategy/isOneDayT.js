

//该算法判定单日的k线是T线  
// 先决条件 1.上涨趋势中 2.位于均线之上 3.大盘向好 4.该股票历史走势中T线的后续走势特征
// 操作   买定后  3日内如果没有突破坚决卖掉  如果第二天和第三天都是弱势坚决卖掉 

// 一定要敢于卖掉，因为这种策略每一天都会产生新的股票  不缺票



function isOneDayT(nowData){
	var [todayOpen,todayHigh,todayLow,now]=nowData;
	var height=todayHigh-todayLow;
	var zhenfu=height/todayLow;
	var openToLow=(todayOpen-todayLow)/height;
	var nowToLow=(now-todayLow)/height;

	var min=Math.min(openToLow,nowToLow);
	// console.log(zhenfu,openToLow,nowToLow);
	if(zhenfu>=0.06&&min>0.65){
		return true;
	}
	else{
		return false;
	}
}

module.exports=isOneDayT;