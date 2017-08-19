/**
 * Created by wangyu on 17/8/13.
 */
var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var fs=require("fs");
var path=require("path");
var cheerio=require("cheerio");
require('superagent-proxy')(superagent);
var request = require('request');

var mongoose=require("mongoose");


var StockModel=require("../../models/stock.js");
let sleep=require('../utils/sleep.js');
let getYMDHMS=require('../utils/getYMDHMS.js');

function getInitialHistoryData(){
    return {
        dataColects:{},
    };
}
let historyData=getInitialHistoryData();

function getDoubleNum(num){
    return num<10?'0'+num:num;
}


module.exports=async function(code,area,start=undefined){
    historyData=getInitialHistoryData();

    code=code||"600000";
    if(!start){
        start=((new Date()).getFullYear()-1)+'0101';
    }
    else{
        start=start.replace(/\-/g,'');
    }
    let timeFormat=getYMDHMS();
    let end=`${timeFormat.year}${getDoubleNum(timeFormat.month)}${getDoubleNum(timeFormat.date)}`;
    let data=await crawHistory(code,area,start,end).catch(async function(err){
        console.log(`---------craw ${code} 自 ${start} - ${end}数据出错 重试中。。。 ---------`)
        await crawHistory(code,area,start).catch(function(err){
            console.log(`-------  craw ${code} 自 ${start} - ${end} 数据出错  不再尝试。。。 ---------`)
        });//再次尝试
    });

    await saveHistoryData(code).catch(function(err){
        console.log(`--------  保存 ${code}  历史数据失败 ---------!`)
    });
    // console.log(historyData)
}

async function crawHistory(code,area,start,end){
    let type=(area=='sh'?0:1);
    let url=`http://quotes.money.163.com/service/chddata.html?code=${type}${code}&start=${start}&end=${end}&fields=TOPEN;HIGH;LOW;TCLOSE;VOTURNOVER;VATURNOVER;`;
    console.log(`crawling  ${code} ${start}至${end} 历史数据`);

    return new Promise(function(resolve,reject){
        request(url,function(error, response, body){
            if(error){
                resolve(false);
            }else{
                console.log(`craw  ${code} ${start}至${end} 历史数据 success`);
                let dataArr=body.split('\r\n').reverse();
                if(dataArr && dataArr.length>1){//获取到了历史数据
                    // console.log(dataArr.length,dataArr.reverse());
                    for(let i=0;i<dataArr.length;i++){
                        let dayData=dataArr[i].split(',');
                        let [time,_a,_b,open,high,low,close,num,money]=dayData;
                        if(!historyData.dataColects[time] && time && /\d{4}/g.test(time) && open*1!=0){
                            historyData.dataColects[time]=[time,open,high,low,close,num,money];
                        }
                    }
                    resolve(historyData);
                }else{
                    resolve(false);
                }
            }
        })

    }).catch(function(){
        console.log(`craw historyData ${code} fail`)
    });
}

async function saveHistoryData(code){
    return new Promise(function(resolve,reject){
        StockModel.findBy({code:code},function(err,data){
            if(err){
                reject(err);
            }else{
                if(!data.historyData){//数据库中没有历史数据
                    StockModel.update({code:code},{
                        $set:{
                            historyData:historyData
                        }
                    },function(err){
                        if(err){
                            reject(err);
                        }else{
                            let {start,end}=getStartAndEnd(historyData.dataColects);
                            console.log(`${code} set historyData from ${start} to ${end} 历史数据成功！`)
                            resolve(historyData);
                        }
                    });
                }else{//数据库中存在历史数据
                    var push=0;

                    Object.keys(historyData.dataColects).forEach(function(timeKey,index){
                        var dayData=historyData.dataColects[timeKey];
                        var time=dayData[0];
                        data.historyData.dataColects[time]=dayData;
                        if(!data.historyData.dataColects[time]&&time){
                            push+=1;
                        }
                    });
                    let {start,end,sortTimes}=getStartAndEnd(Object.assign({},data.historyData.dataColects,historyData.dataColects));
                    let sortedDataColects={};//对插入的数据重新排序 保证顺序的正确性
                    for(let i=0;i<sortTimes.length;i++){
                        const time=sortTimes[i];
                        sortedDataColects[time]=data.historyData.dataColects[time];
                    }
                    data.historyData.dataColects=sortedDataColects;
                    StockModel.update({code:code},data,function(err){
                        if(err){
                            reject(err);
                        }else{
                            console.log(`${code} 共插入 from ${start} to ${end}  ${push}条 historyData 历史数据成功！`)
                            resolve(historyData);
                        }
                    });
                }
            }
        })
    });

}

function getStartAndEnd(timeColects){
    let times=Object.keys(timeColects);
    times=times.sort(function(prev,next){
        return new Date(prev)-new Date(next);
    });
    const start=times[0];
    const end=times[times.length-1];
    return {
        sortTimes:times,
        start,
        end
    }
}



