

module.exports=function(i,sortData){
	if(i==sortData.length-1){
		return {
			rate3:0,
			rate6:0
		}
	}

	let laterDays3=sortData.slice(i+1,i+4);
	let laterDays6=sortData.slice(i+1,i+7);

	let max=0;
	let max3=0;
	let max6=0;
	for(let j=0;j<laterDays3.length;j++){
	  if(laterDays3[j][2]>max){
	    max=laterDays3[j][2];
	  }
	}
	max3=max;

	for(let j=0;j<laterDays6.length;j++){
	  if(laterDays6[j][2]>max){
	    max=laterDays6[j][2];
	  }
	}
	max6=max;
	
	return {
		rate3:( (max3-sortData[i][4])/sortData[i][4] )*100,
		rate6:( (max6-sortData[i][4])/sortData[i][4] )*100
	}
}

