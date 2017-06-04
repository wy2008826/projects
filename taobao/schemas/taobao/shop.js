//schema的文件名会默认为数据库的表名

var mongoose=require("mongoose");
var ShopSchema=new mongoose.Schema({//注意各种数据的格式  数组怎么定义呢
	search:String,
	nickName:String,
	totalsold:Number,
	tuijianArr:[],
});



ShopSchema.pre('save',function(next){//添加事件
	next();
});


ShopSchema.statics={//添加静态方法  schema可以调用mongoose的各种查询方法
	fetch:function(cb){//查询所有数据 并排序
		this.find({},cb);
	},
	findById:function(id,cb){//查询单条数据
		this.find({"_id":id},cb);
	},
	findByKey:function(key,cb){//查询单条数据
		this.findOne({key:key},cb);
	}
};


module.exports=ShopSchema;