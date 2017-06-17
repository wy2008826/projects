
module.exports=function(historyDataLists){
	// 5 10 20 30 40日线
	var averageArr=[];
	var aver_5=getAverage(5,historyDataLists);
	var aver_10=getAverage(10,historyDataLists);
	var aver_20=getAverage(20,historyDataLists);
	var aver_30=getAverage(30,historyDataLists);
	var aver_40=getAverage(40,historyDataLists);
	var aver_60=getAverage(60,historyDataLists);
	for(let i=0;i<historyDataLists.length;i++){
		averageArr.push({
			"_5":aver_5[i],
			"_10":aver_10[i],
			"_20":aver_20[i],
			"_30":aver_30[i],
			"_40":aver_40[i],
			"_60":aver_60[i],
		});
	}
	return averageArr;
	
}

function getAverage(range,lists){
	var average=[];
	for(let i=0;i<lists.length;i++){
		if(i<range-1){
			average.push(undefined);
		}else{
			let group=lists.slice(i-range+1,i+1);
			let sum=0;
			for(let j=0;j<group.length;j++){
				sum+=group[j][4]*1;
			}
			average.push(sum / range);
		}
	}
	return average;
}