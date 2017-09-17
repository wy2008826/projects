//express的核心是http模块

var http=require("http");
var express=require("express");
var hbs=require("hbs");
var mongoose=require("mongoose");
mongoose.connect("mongodb://wangyu:wangyu@127.0.0.1:27017/admin");


var app=express();
let schedule = require("node-schedule");//定时任务

let timeRules=require ("./const/consts.js");

let crawIps=require('./routes/controllers/crawIps');
let crawAllSlotsAndSearchOneDayT =require("./routes/controllers/crawAllSlotsAndSearchOneDayT.js");
let crawHistoryDataAll=require("./routes/controllers/crawHistoryDataAll");

let apiDIY=require("./routes/controllers/apiDIY");
let writeApiResultsFiles=require('./routes/controllers/writeApiResultsFiles');


let testChangeStockDta=require('./test/changeStockData.js');


app.use(express.static(__dirname+"/"));//设置静态资源路径
app.set("view engine","hbs");//设置模板引擎
app.set("views",__dirname+"/views");//设置视图路径


var pageRoutes=require("./routes/pageRoutes");//页面路由
var apiRoutes=require("./routes/apiRoutes");//api路由
var crawRoutes=require("./routes/crawRoutes");//api路由

//每隔半小时更新一次历史数据
schedule.scheduleJob(timeRules.everyHalfHour,async function(){
    await crawAllSlotsAndSearchOneDayT();
    await writeApiResultsFiles();
});


//每天晚上6:10爬取数据  完善数据库股票的历史数据
schedule.scheduleJob(timeRules.excludeWeekends18, async function(){
	await crawHistoryDataAll();
});


async function all(){

	// testChangeStockDta();
    // await crawIps();

    // await crawAllSlotsAndSearchOneDayT();//抓取数据
   	// await crawHistoryDataAll();//抓取所有股票的历史数据
    // await writeApiResultsFiles();

	// apiDIY();
}

all();


app.use("/",pageRoutes);
app.use("/",apiRoutes);
app.use("/",crawRoutes);

app.listen(3000);

