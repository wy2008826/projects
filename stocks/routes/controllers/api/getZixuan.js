/**
 * Created by wangyu on 17/8/16.
 */


const UserModel=require("../../../models/user.js");

module.exports=async function(req_query){
    return new Promise(async function(resolve,reject){
        let {user}=req_query;

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
                        resolve({
                            r:true,
                            zixuan:{
                                lists:[]
                            }
                        })
                    }else{
                        resolve({
                            r:true,
                            zixuan:User.zixuan
                        })
                    }
                }
            }
        });

    }).catch(function(){
        console.log("添加自选出错 error!")
    });

}

