
var StockModel=require("../../models/stock.js");
var isOneDayT = require("../../strategy/isOneDayT.js");

module.exports=async function(){
    return new Promise(async function(resolve,reject){
        let all=[];
        let Query=StockModel.find({},["code","name",'nowData']);

        Query.exec(function(err,stocks){
            if(err){
                console.log("find err:",err)
                reject(err);
            }else{
                let length=stocks.length;
                console.log(length);
                for(let i=0;i<length;i++){

                    let stock=stocks[i];
                    if(isOneDayT(stock["nowData"])){
                        all.push({
                            code:stock["code"],
                            name:stock["name"],
                            nowData:stock["nowData"]
                        });
                    }

                }
                resolve(all);
            }
        });

    }).catch(function(){
        console.log("begain craw historyData error!")
    });

}