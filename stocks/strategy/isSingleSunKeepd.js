
let keepDays=5;

module.exports=function isSingleSunKeepd(historyDataLists){//数组长度最少为18
	let length=historyDataLists.length;
	
	let response={
		isSuit:false
	};

	let _isZhaiFuPlat=isZhaiFuPlat(historyDataLists.slice(historyDataLists.length - keepDays));//窄幅震荡
	let _singleSunZhenFu=getZhenFu(historyDataLists[length-keepDays-1]);
	let _prev_singleSunZhenFu=getZhenFu(historyDataLists[length-keepDays-2]);
	let _platIsTop=platIsTop(historyDataLists.slice(length-keepDays -1));

	if(_isZhaiFuPlat && _platIsTop && _singleSunZhenFu>0.035 && _singleSunZhenFu<0.085){//平台窄幅震荡 并且单个大阳振幅介于 4-7个点之间
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


function isZhaiFuPlat(stocks){//判断一定数量的股票是否是窄幅震荡
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
		if( ( curMax - curMin ) / curMin >0.01){//每一根k线实体部分振幅不超过1个点
			isZhaiFu=false;
			break;
		}
	}

	if( (max-min) / min > 0.018){//6日内最高点到最低点振幅不高于1.5个点
		isZhaiFu=false;
	}

	return isZhaiFu;

}

function platIsTop(stocks){//平台的最低价位于单根大阳线的3分之2以上
	let length=stocks.length;
	let max=-100000;
	let min=100000;
	for(let i=1;i<length;i++){
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
	}
	return min > stocks[0][1]*1+(stocks[0][4] - stocks[0][1])*0.66;
}

function getZhenFu(stock){
	let open=stock[1];
	let close=stock[4];
	let zhenfu=(close - open) / open;

	return zhenfu;
}
