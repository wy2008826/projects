/**
 * Created by wangyu on 17/8/19.
 */


let mongoose=require("mongoose");
let VisitorSchema=new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    ua:Array,
    own:String,
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


VisitorSchema.pre('save',function(next){//添加事件
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }
    else{
        this.meta.updateAt=Date.now();
    }

    next();
});



module.exports=VisitorSchema;