
const UserModel=require("../../../models/user.js");
let users;

module.exports=async function(req_query){
    return new Promise(async function(resolve,reject){
        let {username,password}=req_query;

        let Query=UserModel.findOne({username});
        Query.exec(function(err,user){
            if(err){
                console.log("find err:",err)
                reject({
                    save:false,
                    msg:'后台错误！'
                });
            }else{
                if(!user){
                    var user = new UserModel({//根据model生成数据实例
                        username,
                        password
                    });
                    user.save(function(err,data){
                        if(err){
                            console.log(err);
                            reject({
                                save:false,
                                msg:'后台错误！'
                            });
                        }
                        else{
                            resolve({save:true,username,msg:'注册成功！'});
                        }
                    });
                }else{
                    resolve({save:false,msg:'该用户名已存在！'});
                }
            }
        });

    }).catch(function(){
        console.log("用户注册出错 error!")
    });

}
