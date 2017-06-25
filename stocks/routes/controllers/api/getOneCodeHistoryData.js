
let StockModel=require("../../../models/stock.js");

module.exports=async function(code){
    return new Promise(async function(resolve,reject){
        let Query=StockModel.findOne({code},["code","name","historyData"]);
        Query.exec(function(err,data){
            if(err){
                console.log("find err:",err)
                reject(err);
            }else{
                let result={
                    code:data.code,
                    name:data.name,
                    historyData:data.historyData
                };
                resolve(result);
            }
        });


    }).catch(function(){
        console.log("begain craw historyData error!")
    });

}
