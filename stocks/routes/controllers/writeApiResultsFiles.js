let mongoose=require("mongoose");
const apiDIY =require('./apiDIY.js');
const getYMDHMS =require('../utils/getYMDHMS.js');
const suanfa =require('../../const/suanfa.js');

const path=require('path');
const fs=require('fs');



module.exports=async function(){
    // 最近收T
    let T_Data=await apiDIY(suanfa.T);
    if(T_Data){
        await writeFile('T',createData(T_Data));
    }

    //最近单阳不破
    let Single_Sun_Data=await apiDIY(suanfa.SingleSunKeepDays);
    if(Single_Sun_Data){
        await writeFile('SingleSunKeepDays',createData(Single_Sun_Data));
    }

    // 最近涨幅巨大
    let Bounce_Price=await apiDIY(suanfa.bouncePrice);
     if(Bounce_Price){
        await writeFile('BouncePrice',createData(Bounce_Price));
    }

    // 最近阳线突然击穿均线密集区域
    let singleSun_UpClosedAverage=await apiDIY(suanfa.singleSunUpClosedAverage);
    if(singleSun_UpClosedAverage){
        await writeFile('singleSunUpClosedAverage',createData(singleSun_UpClosedAverage));
    }

}

async function writeFile(file_name,data){
    var url=path.resolve(__dirname,"../../baseData/");

    return new Promise(function(resolve,reject){
        fs.writeFile(url+`/${file_name}.json`,JSON.stringify(data),"utf8",function(err,data){
            if(err){
                console.log(err);
                reject(err);
            }else{
                console.log(`数据写入成功`);
                resolve(true);
            }
        });
    });
}

function createData(lists){
    let time=getYMDHMS(new Date());
    return {
        time:`${time.year}-${time.month}-${time.date} ${time.hour}:${time.minute}:${time.second}`,
        lists
    };
}