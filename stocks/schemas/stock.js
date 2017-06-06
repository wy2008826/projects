//schema的文件名会默认为数据库的表名

var mongoose=require("mongoose");
var StockSchema=new mongoose.Schema({//注意各种数据的格式  数组怎么定义呢
	id: mongoose.Schema.Types.ObjectId,
	area:String,
	code:String,
	name:String,
	finance:mongoose.Schema.Types.Mixed,
	nowData:Array,
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



StockSchema.pre('save',function(next){//添加事件
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}
	else{
		this.meta.updateAt=Date.now();
	}

	next();
});


StockSchema.statics={//添加静态方法  schema可以调用mongoose的各种查询方法
	fetch:function(cb){//查询所有数据 并排序
		this.find({},cb);
	},
	findById:function(id,cb){//查询单条数据
		this.find({"_id":id},cb);
	},
	findBy:function(query,cb){//查询单条数据
		query=query||{};
		this.findOne(query,cb);
	}
};


module.exports=StockSchema;