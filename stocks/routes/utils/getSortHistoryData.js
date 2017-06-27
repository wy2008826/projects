module.exports=function(dataColects){
	let historyData=[];
	Object.keys(dataColects).forEach(function(timeKey,index){
		historyData.push(dataColects[timeKey]);
	});

	historyData=historyData.sort(function(prev,next){
		return new Date(prev[0])-new Date(next[0]);
	});

	return historyData;
}