const apiDIY =require('./apiDIY.js');
const getYMDHMS =require('../utils/getYMDHMS.js');
const path=require('path');
const fs=require('fs');

const T={
    days:10,
    strategyName:'本地数据查找最近收T的股票！！',
    baseDay:{
        formulas:[
            '(H-L)/L>0.06',
            '(O-L)/(H-L)>0.65',
            '(C-L)/(H-L)>0.65'
        ]
    }
};

const SingleSunKeepDays={
    days:20,
    strategyName:'本地数据查找最近单阳不破的股票！！',
    baseDay:{
        formulas:[
            '(C-O)/O>0.04',
            '(C-O)/O<0.095',
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


module.exports=async function(){
    let T_Data=await apiDIY(T);
    await writeFile('T',createData(T_Data));

    let Single_Sun_Data=await apiDIY(SingleSunKeepDays);
    await writeFile('SingleSunKeepDays',createData(Single_Sun_Data));
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