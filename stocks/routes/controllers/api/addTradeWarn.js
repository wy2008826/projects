/**
 * Created by wangyu on 17/9/4.
 */


const UserModel=require("../../../models/user.js");

module.exports=async function(req_query){
    return new Promise(async function(resolve,reject){
        let {user,code,huitiao_price=null,huitiao_aver=null}=req_query;

        let Query=UserModel.findOne({username:user});
        Query.exec(function(err,User){
            if(err){
                console.log("find err:",err)
                reject({
                    r:false,
                    msg:'后台错误！'
                });
            }else{
                if(!User){
                    resolve({r:false,msg:'用户名不存在！'});
                }else{
                    if(!User.zixuan||!User.zixuan[code] ){
                        resolve({
                            r:false,
                            msg:'该股票没有加入自选股！'
                        });
                    }
                    User.zixuan[code].huitiao={};
                    if(huitiao_price){
                        User.zixuan[code].huitiao.price=huitiao_price;
                    }
                    if(huitiao_aver){
                        User.zixuan[code].huitiao.aver=huitiao_aver;
                    }

                    UserModel.update({username:user},User,function(err){
                        if(err){
                            reject(err);
                        }else{
                            console.log(`${user} ${code} 设置交易提醒成功`)
                            resolve({
                                r:true,
                                msg:'设置交易提醒成功'
                            });
                        }
                    });
                }
            }
        });

    }).catch(function(){
        console.log("添加自选出错 error!")
    });

}

