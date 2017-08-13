var request = require('superagent');
var cheerio = require('cheerio');
let ProxyModel=require("../../models/proxy.js");
require('superagent-proxy')(request);

async function crawIps() {
    let ips=[];
    return new Promise(async (resolve,reject)=>{
        for(var page = 1; page <= 10; page++){
            //请求代理IP页面
            console.log('loading '+page);
            let url='http://www.xicidaili.com/nn/' + page;
            let res=await crawPage(url);

            if(!res){
                console.log('error');
            }else{
                let ips=getXiCiPageIps(res);
                //从第二行开始获取IP和端口
                for(let i = 0 ; i < ips.length ; i++ ){
                    let proxy =  'http://' + ips[i];
                    try {
                        //代理IP请求，设置超时为3000ms，返回正确即当可用
                        console.log(proxy);
                        let checked=await testProxy(proxy);
                        if(checked ){
                            let save=await saveProxy(proxy);
                            if(save){
                                console.log(`save ${proxy} success`);
                            }
                        }

                    }catch (error){
                        console.log('error');;
                    }
                }
            }

        }
        resolve(ips);
    });

};

//必须模拟浏览器行为才可以爬取
async function crawPage(url){
    return new Promise((resolve,reject)=>{
        console.log(url);
        request.get(url).set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36').end((err,res)=>{
            if(err){
                resolve(false);
            }else{
                resolve(res);
            }
        });
    });
}

async function testProxy(proxy){
    return new Promise((resolve,reject)=>{

        request.get('http://ip.chinaz.com/getip.aspx').proxy(proxy).set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36').timeout(3000).end((err,testip)=>{
            if(err){
                resolve(false);
            }else{
                if(testip.text.search('address')>=0 ){
                    console.log('testip.text: ',testip.text);
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        });
    });
}

async function saveProxy(proxy){
    return new Promise(function (resolve,reject) {
        ProxyModel.findOne({proxy},function(err,data){
            if(err){
                console.log(err);
                resolve(false);
            }
            else{
                if(!data||data.length==0){
                    let _proxy= new ProxyModel({//根据model生成数据实例
                        proxy
                    });

                    _proxy.save(function(err,data){
                        if(err){
                            console.log(err);
                            resolve(false);
                        }
                        else{
                            resolve(true);
                        }
                    });
                }else{
                    resolve(false);
                }
            }
        });
    });
}
function getXiCiPageIps(res){
    var $ = cheerio.load(res.text);
    var tr = $('tr');
    let ret=[];
    //从第二行开始获取IP和端口
    for(var line = 1 ; line < tr.length ; line++ ){
        var td = $(tr[line]).children('td');
        var proxy =  td[1].children[0].data + ':' + td[2].children[0].data;
        ret.push(proxy);
    }
    return ret;
}

module.exports=crawIps;