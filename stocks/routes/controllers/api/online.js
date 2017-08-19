/**
 * Created by wangyu on 17/8/15.
 */

const UserModel=require("../../../models/user.js");
let getYMDHMS=require('../../utils/getYMDHMS.js');
let addVisitor = require('./addVisitor.js');

module.exports=async function(req_query){
    return new Promise(async function(resolve,reject){
        let {user,ua}=req_query;

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
                    if(!User.online){
                        User.online=[];
                    }
                    let {year,month,date,hour,minute,second}=getYMDHMS();
                    month=fullNum(month);
                    date=fullNum(date);
                    hour=fullNum(hour);
                    minute=fullNum(minute);
                    second=fullNum(second);
                    let time=`${year}-${month}-${date} ${hour}:${minute}:${second}`;

                    User.online.unshift(time);
                    if(User.online.length>10){
                        User.online.pop();
                    }
                    User.ua=ua;
                    UserModel.update({username:user},User,async function(err){
                        if(err){
                            reject(err);
                        }else{
                            console.log(`${user} 上线记录成功`)
                            await addVisitor({ua,time});
                            resolve({
                                r:true,
                                time,
                                msg:'上线成功'
                            });
                        }
                    });
                }
            }
        });

    }).catch(function(){
        console.log("用户上线出错 error!")
    });

}

function fullNum(num){
    return num<10?'0'+num:num;
}

