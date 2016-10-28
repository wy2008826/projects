//schema的文件名会默认为数据库的表名

var mongoose=require("mongoose");
var ElevatorSchema=new mongoose.Schema({//注意各种数据的格式  数组怎么定义呢
	id: mongoose.Schema.Types.ObjectId,
	province:String,
	city:String,
	area:String,
	address:String,
	loupanName:String,//楼盘名称
	cooperStart:String,//合作开始日期
	cooperEnd:String,//合作结束日期
	subHouseLists:Array,//栋别列表
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

// var subHouses=[//楼盘的栋别列表
// 	{
// 		subName:String,
// 		timestap:String,
// 		elevators:[//所有可用电梯
// 			{
// 				elevatorName:String,
// 				wallLists:[//电梯可用面列表
// 					{
// 						wallName:String,//
// 						companyName:String,//合作公司名字
// 						cooperStart:String,
// 						cooperEnd:String,//合作期限
// 						type:Number,//广告类别
// 					},
// 					{
						
// 					},
// 				]
// 			}
// 		]
// 	},

// ]


ElevatorSchema.pre('save',function(next){//添加事件
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now();
	}
	else{
		this.meta.updateAt=Date.now();
	}

	next();
});


ElevatorSchema.statics={//添加静态方法  schema可以调用mongoose的各种查询方法
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


module.exports=ElevatorSchema;