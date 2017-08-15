/**
 * Created by wangyu on 17/8/15.
 */

/**
 * Created by wangyu on 17/8/15.
 */

const UserModel=require("../../../models/user.js");

module.exports=async function(req_query){
    return new Promise(async function(resolve,reject){
        let {user,code,time,comment,name}=req_query;

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
                    if(!User.zixuan){
                        User.zixuan={
                            lists:[]
                        };
                    }
                    if(!User.zixuan[code]){
                        User.zixuan.lists.push(code);
                        User.zixuan[code]={
                            time,
                            name,
                            comments:[
                                {
                                    comment,
                                    time
                                }
                            ]
                        }
                    }else{
                        User.zixuan[code].comments.push({
                            comment,
                            time
                        });
                    }
                    UserModel.update({username:user},User,function(err){
                        if(err){
                            reject(err);
                        }else{
                            console.log(`${user} 添加自选 ${code} 成功`)
                            resolve({
                                r:true,
                                msg:'添加自选成功'
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

