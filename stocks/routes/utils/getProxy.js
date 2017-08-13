
var ProxyModel=require("../../models/proxy.js");

module.exports=function (){
    return new Promise(function(resolve,reject){
        ProxyModel.find({},function(err,data){
            if(err){
                reject(0);
            }else{
                resolve(data);
            }
        });
    }).catch(function(err){
        console.log("本地查找代理ip失败 ！！！！！")
    });
}

