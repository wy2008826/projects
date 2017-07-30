
const UserModel=require("../../../models/user.js");

module.exports=async function(req_query){
    return new Promise(async function(resolve,reject){
        let {username,password}=req_query;

        let Query=UserModel.findOne({username});
        Query.exec(function(err,user){
            if(err){
                console.log("find err:",err)
                reject({
                    r:false,
                    msg:'后台错误！'
                });
            }else{
                if(!user){
                    resolve({r:false,msg:'用户名不存在！'});
                }else{
                    if(username!=user.username || password!=user.password){
                        resolve({r:false,msg:'用户名或密码错误！'});
                    }else{
                        resolve({r:true,msg:'登录成功！',username});
                    }
                }
            }
        });

    }).catch(function(){
        console.log("用户登录出错 error!")
    });

}
