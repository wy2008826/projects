

module.exports=function(i,sortData){
	if(i==sortData.length-1){
		return {
			rate3:0,
			rate6:0,
			rate9:0,
			rate12:0,
			rate20:0,
			rate30:0,
			rate3Days:0,
			rate6Days:0,
			rate9Days:0,
			rate12Days:0,
			rate20Days:0,
            rate30Days:0,
		}
	}

	
	let rate3s=calRate(i,3,sortData);
	let rate6s=calRate(i,6,sortData);
	let rate9s=calRate(i,9,sortData);
	let rate12s=calRate(i,12,sortData);
	let rate20s=calRate(i,20,sortData);
	let rate30s=calRate(i,30,sortData);

	return {
		rate3:( (rate3s.max-sortData[i][4])/sortData[i][4] )*100,
		rate6:( (rate6s.max-sortData[i][4])/sortData[i][4] )*100,
		rate9:( (rate9s.max-sortData[i][4])/sortData[i][4] )*100,
		rate12:( (rate12s.max-sortData[i][4])/sortData[i][4] )*100,
		rate20:( (rate20s.max-sortData[i][4])/sortData[i][4] )*100,
		rate30:( (rate30s.max-sortData[i][4])/sortData[i][4] )*100,
		rate3Days:rate3s.calDays,
		rate6Days:rate6s.calDays,
		rate9Days:rate9s.calDays,
		rate12Days:rate12s.calDays,
		rate20Days:rate20s.calDays,
        rate30Days:rate30s.calDays,
	}
}

function calRate(i,days,historyData){
	let rate;
	let datas=historyData.slice(i+1,i+1+days);
	let maxs=[];
	for(let j=0;j<datas.length;j++){
	    maxs.push(datas[j][2]);
	}

	return {
		max:Math.max.apply(null,maxs),
		calDays:datas.length
	};
}
