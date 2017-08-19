

const VisitorModel=require("../../../models/visitor.js");

module.exports=async function(req_query){
    return new Promise(async function(resolve,reject){
        let {ua,time}=req_query;

        let Query=VisitorModel.findOne({});
        Query.exec(function(err,Visitor){
            if(err){
                console.log("find err:",err)
                resolve({
                    r:false,
                    msg:'后台错误！'
                });
            }else{
                if(!Visitor){
                    let visitor = new VisitorModel({//根据model生成数据实例
                        ua:[
                            {ua,time}
                        ],
                        own:'root'
                    });
                    visitor.save(function(err,data){
                        if(err){
                            console.log(err);
                            resolve({
                                save:false,
                                msg:'后台错误！'
                            });
                        }
                        else{
                            resolve({save:true,msg:'创建成功！'});
                        }
                    });
                }else{
                    Visitor.ua.unshift({ua,time})
                    if(Visitor.ua.length>200){
                        Visitor.ua.pop();
                    }
                    VisitorModel.update({own:'root'},Visitor,function(err){
                        if(err){
                            reject(err);
                        }else{
                            console.log(`访客记录成功`)
                            resolve({
                                save:true,
                                msg:'访客记录成功'
                            });
                        }
                    });
                }
            }
        });

    }).catch(function(){
        console.log("访客记录出错 error!")
    });

}

