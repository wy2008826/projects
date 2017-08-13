//schema的文件名会默认为数据库的表名

let mongoose=require("mongoose");
let ProxySchema=new mongoose.Schema({//注意各种数据的格式  数组怎么定义呢
    id: mongoose.Schema.Types.ObjectId,
    proxy:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});



ProxySchema.pre('save',function(next){//添加事件
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }
    else{
        this.meta.updateAt=Date.now();
    }

    next();
});


module.exports=ProxySchema;