

module.exports=function isSingleSunKeepd(historyDataLists){//数组长度最少为18
	let length=historyDataLists.length;
	
	let response={
		isSuit:false
	};
	let keepDays=6;


	let _isZhaiFuPlat=isZhaiFuPlat(historyDataLists.slice(historyDataLists.length - keepDays));//窄幅震荡
	let _singleSunZhenFu=getZhenFu(historyDataLists[length-keepDays-1]);
	let _prev_singleSunZhenFu=getZhenFu(historyDataLists[length-keepDays-2]);

	if(_isZhaiFuPlat && _singleSunZhenFu>0.06){
		return {
			isSuit:true,
			buyTime:historyDataLists[length-1][0]
		}
	}else{
		return {
			isSuit:false,
		}
	}
	
}


function isZhaiFuPlat(stocks){
	let length=stocks.length;
	let isZhaiFu=true;
	let max=-100000;
	let min=100000;

	for(let i=0;i<length;i++){//连续 keepDays 保持窄幅震荡

		let stock=stocks[i];
		let shiTiOpen=stock[1];
		let shiTiClose=stock[4];

		let curMin=Math.min(shiTiOpen,shiTiClose);
		let curMax=Math.max(shiTiOpen,shiTiClose);

		if(curMax>max){
			max=curMax
		}
		if(curMin < min){
			min=curMin
		}
		if( ( curMax - curMin ) / curMin >0.01){
			isZhaiFu=false;
			break;
		}
	}

	if( (max-min) / min > 0.02){//6日内最高点到最低点振幅不高于2.5个点
		isZhaiFu=false;
	}

	return isZhaiFu;

}


function getZhenFu(stock){
	let open=stock[1];
	let close=stock[4];
	let zhenfu=(close - open) / open;

	return zhenfu;
}
