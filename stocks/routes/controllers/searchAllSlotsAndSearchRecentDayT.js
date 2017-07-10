
var StockModel=require("../../models/stock.js");
var isOneDayT = require("../../strategy/isOneDayT.js");
var getSortHistoryData=require('../utils/getSortHistoryData.js');
const calProfitFromOneDay=require('../utils/calProfitFromOneDay.js');
const calPricePosition=require('../utils/calPricePosition.js');


module.exports=async function(){
    let begain=new Date();
    return new Promise(async function(resolve,reject){

        let codesQuery=StockModel.find({},["code"]);
        let codes;
        let count=await codesQuery.then(function(docs){
            codes=docs;
            return docs.length||0;
        });
        if(!count){
            reject("find local database error");
        }else{
            let all=[];
            for(let i=0;i<count;i++){//需要对数据进行拆分，不然会导致内存泄漏
                let query=StockModel.findOne({code:codes[i].code});
                let suits=await searchOneCodeT(query);
                all=all.concat(suits||[]);
            }
            let end=new Date();
            let minutes=( (end-begain) / (1000 * 60 ) );
            console.log(`loaded all historyData 😊 !!! 共耗时 ${minutes} 分钟`);
            resolve(all);
        }


    }).catch(function(){
        console.log("begain craw historyData error!")
    });

}

//最近15天的数据
let recentDays=15;

function searchOneCodeT(query){
    let suits=[];
    return new Promise(function(resolve,reject){
        return query.exec(async function(err,stock){
            if(err){
                console.log("find err:",err)
                reject(err);
            }else{
                let {code,name,historyData,nowData}=stock;

                if(historyData){
                    let recentData;
                    let historyData=getSortHistoryData(stock.historyData.dataColects);
                    let length=historyData.length;

                    if(length<recentDays){
                        recentData=historyData
                    }else{
                        recentData=historyData.slice(length-recentDays);
                    }

                    for(let i=0;i<recentData.length;i++){
                        let dayData=recentData[i];

                        if(isOneDayT(dayData)){
                            const buyTime=dayData[0];
                            const historyIndex=historyData.indexOf(dayData);

                            const {rate3,rate6,rate9,rate12,rate3Days,rate6Days,rate9Days,rate12Days} =calProfitFromOneDay(historyIndex,historyData);
                            const {pos}=calPricePosition(historyIndex,historyData);
                            // console.log(rate3Days,rate6Days,rate9Days,rate12Days,pos);
                            if(new Date(nowData[0]) - new Date(buyTime) <(recentDays+12)*24*60*60*1000 &&pos<85){
                                suits.push({
                                    code,
                                    name,
                                    buyTime,
                                    rate3,
                                    rate6,
                                    rate9,
                                    rate12,
                                    pos
                                });
                            }

                        }
                    }
                    resolve(suits);
                    
                }else{
                    reject([]);
                }
                
            }
        });
    });
}
