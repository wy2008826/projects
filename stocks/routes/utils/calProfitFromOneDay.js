

module.exports=function(i,sortData){
	if(i==sortData.length-1){
		return {
			rate3:0,
			rate6:0,
			rate9:0,
			rate12:0
		}
	}

	let laterDays3=sortData.slice(i+1,i+4);
	let laterDays6=sortData.slice(i+1,i+7);
	let laterDays9=sortData.slice(i+1,i+10);
	let laterDays12=sortData.slice(i+1,i+13);


	let max=0;
	let max3=0;
	let max6=0;
	let max9=0;
	let max12=0;

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

	for(let j=0;j<laterDays9.length;j++){
	  if(laterDays9[j][2]>max){
	    max=laterDays9[j][2];
	  }
	}
	max9=max;

	for(let j=0;j<laterDays12.length;j++){
	  if(laterDays12[j][2]>max){
	    max=laterDays12[j][2];
	  }
	}
	max12=max;

	
	return {
		rate3:( (max3-sortData[i][4])/sortData[i][4] )*100,
		rate6:( (max6-sortData[i][4])/sortData[i][4] )*100,
		rate9:( (max9-sortData[i][4])/sortData[i][4] )*100,
		rate12:( (max12-sortData[i][4])/sortData[i][4] )*100,
	}
}

