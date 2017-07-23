

module.exports=function(start,end,sortData){

    const range=sortData.slice(start||0,end||sortData.length);
    let length=range.length;

    let min=100000;
    let max=-10000;

    for(let i=0;i<length;i++){
        let dayData=range[i];
        let high=dayData[2];
        let low=dayData[3];
        min=Math.min(min,low);
        max=Math.max(max,high);
    }

    return {
        max,
        min,
    }
}

