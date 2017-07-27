var mongoose=require("mongoose");

var StockModel=require("../../models/stock.js");

var getSortHistoryData=require('../utils/getSortHistoryData.js');
let calAverageLineData=require("../utils/calAverageLineData.js");
let calProfitFromOneDay=require("../utils/calProfitFromOneDay.js");
let calMaxMinFromStartToEnd=require("../utils/calMaxMinFromStartToEnd.js");

module.exports=function(_res_query){

    const res_query=_res_query||{
        days:20,
        strategyName:'本地数据库查找单阳不破的股票！！！',
        baseDay:{
            formulas:[
                '(C-O)/O>0.04',
                '(C-O)/O<0.095',
            ]
        },
        passDays:{
            formulas:[
                // 'every("(c-o)/o<0.02",3)',
                // 'every("(c-o)/o>-0.02",3)',
                // 'max("vol",5)<VOL*0.5',//前5日最大成交量不高于vol*0.6
                // 'count("(c-o)/0>0.02",5)>3'
            ]
        },
        laterDays:{
            formulas:[
                'every("(c-o)/o<=0.012",4)',
                'every("(o-O)/(C-O)>0.66",4)',
                'every("(c-O)/(C-O)>0.66",4)',
            ]
        }
    };
    const strategyName=res_query.strategyName;

    return new Promise(async function(resolve,reject){
        let start=new Date();
        let suits=[];

        let Query=StockModel.find({},["code"]);
        let codes;
        let count=await Query.then(function(docs){
            codes=docs;
            return docs.length||0;
        });

        if(!count){
            reject("find local database error");
        }else{
            console.log(`finding.......${strategyName}`);
            for(let i=0;i<count;i++){//需要对数据进行拆分，不然会导致内存泄漏

                let code=codes[i].code;
                let reg=/^300\d+/;

                if(reg.test(code)){//排除创业板的股票
                    continue;
                }
                let query=StockModel.findOne({code:codes[i].code});
                let suit=await searchOneCode(query,res_query);
                if(suit){
                    suits=suits.concat(suit);
                }
            }


            let end=new Date();
            let minutes=( (end-start) / (1000 * 60 ) );
            console.log(`${strategyName} 😊 !!! 共耗时 ${minutes} 分钟`);

            console.log(suits,suits.length);
            resolve(suits);
        };
    });
}

function searchOneCode(query,res_query){
    return new Promise(function(resolve,reject){
        return query.exec(async function(err,stock){
            if(err){
                console.log("find err:",err)
                reject(err);
            }else{

                let code=stock.code;
                let name=stock.name;
                if(!stock.historyData){
                    console.log(code);
                    resolve([]);
                    return [];
                }
                let historyData=getSortHistoryData(stock.historyData.dataColects||[]);
                let hisLength=historyData.length;
                if(historyData && hisLength>=60){
                    let suits=[];
                    let averageData=calAverageLineData(historyData);

                    for(let i=hisLength-1;i>hisLength-res_query.days;i--){
                        let [T,O,H,L,C,VOL]=historyData[i];
                        let {_5,_10,_20,_30,_40,_60}=averageData[i];

                        let isSuit=true;
                        for(let j=0;j<res_query.baseDay.formulas.length;j++){
                            let str=res_query.baseDay.formulas[j];
                            let _isSuit=eval(str);

                            isSuit=isSuit && _isSuit;
                        }

                        // isSuit= isSuit && eval(res_query.passDays.formulas[0]);
                        // isSuit&&console.log(code,_60);
                        let dir='pass';//pass later

                        let passSuit=true;
                        if(res_query.passDays){
                            dir='pass';
                            for(let j=0;j<res_query.passDays.formulas.length;j++){
                                let str=res_query.passDays.formulas[j];
                                _passSuit=eval(str);
                                passSuit=passSuit && _passSuit;
                            }
                        }
                        let laterSuit=true;
                        if(res_query.laterDays){
                            dir='later';
                            for(let j=0;j<res_query.laterDays.formulas.length;j++){
                                let str=res_query.laterDays.formulas[j];
                                _laterSuit=eval(str);

                                laterSuit=laterSuit && _laterSuit;
                            }
                        }

                        isSuit && passSuit && laterSuit && console.log(code,name,T, passSuit ,eval('max("vol",5)'),eval('VOL*0.6'));
                        let {rate3,rate6,rate9,rate12,rate20}=calProfitFromOneDay(i,historyData);
                        if(isSuit && passSuit && laterSuit){
                            suits.push({
                                t:T,
                                baseData:historyData[i],
                                name,
                                code,
                                rate3,
                                rate6,
                                rate9,
                                rate12,
                                rate20
                            });
                        }

                        function max(express,days){
                            days=days*1;
                            let passData;
                            let passAverData;
                            if(dir=='pass'){
                                passData=historyData.slice(Math.max(i-days,0),i);
                                passAverData=averageData.slice(Math.max(i-days,0),i);
                            }else{
                                passData=historyData.slice(i+1,Math.min(i+days+1,hisLength));
                                passAverData=averageData.slice(i+1,Math.min(i+days+1,hisLength));
                                T=passData.length && passData[passData.length-1][0];
                            }
                            if(i+days+1>hisLength){
                                return -1000000000;
                            }

                            let _max=[];

                            for(let i=0;i<passData.length;i++){
                                let [t,o,h,l,c,vol]=passData[i];
                                let {_5,_10,_20,_30,_40,_60}=passAverData[i];
                                let val=eval(express);
                                // console.log(val);
                                _max.push(val);
                            }
                            return Math.max.apply(null,_max);
                        }

                        function every(express,days){
                            days=days*1;
                            let passData;
                            let passAverData;
                            if(dir=='pass'){
                                passData=historyData.slice(Math.max(i-days,0),i);
                                passAverData=averageData.slice(Math.max(i-days,0),i);
                            }else{
                                passData=historyData.slice(i+1,Math.min(i+days+1,hisLength));
                                passAverData=averageData.slice(i+1,Math.min(i+days+1,hisLength));
                                T=passData.length && passData[passData.length-1][0];
                            }
                            if(i+days+1>hisLength){
                                return false;
                            }

                            let isSuit=true;

                            for(let i=0;i<passData.length;i++){
                                let [t,o,h,l,c,vol]=passData[i];
                                let {_5,_10,_20,_30,_40,_60}=passAverData[i];
                                let val=eval(express);
                                if(!val){
                                    isSuit=false;
                                    break;
                                }
                            }
                            return isSuit;

                        }
                    }


                    resolve(suits);
                }
                resolve(false);
            }
        });
    });
}





