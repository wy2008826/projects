//express的核心是http模块

var http=require("http");
var express=require("express");
var hbs=require("hbs");
var app=express();
let schedule = require("node-schedule");//定时任务

let timeRules=require ("./const/consts.js");

let crawAllSlotsAndSearchOneDayT =require("./routes/controllers/crawAllSlotsAndSearchOneDayT.js");
let crawHistoryDataAll=require("./routes/controllers/crawHistoryDataAll");
let crawHistoryDataOne=require("./routes/controllers/crawHistoryDataOne");
let selectAllAverageUp=require("./routes/controllers/selectAllAverageUp");
let selectHuiTiaoToAverageLineAllType=require("./routes/controllers/selectHuiTiaoToAverageLineAllType");
let selectHuiTiaoToAverageLineOneType=require("./routes/controllers/selectHuiTiaoToAverageLineOneType");
let selectSingleSunKeepedDays=require("./routes/controllers/selectSingleSunKeepedDays");

let testSearchOneCodeSingleSunKeepedDays=require("./testStrategy/searchOneCodeSingleSunKeepedDays");


app.use(express.static(__dirname+"/dist"));//设置静态资源路径
app.set("view engine","hbs");//设置模板引擎
app.set("views",__dirname+"/views");//设置视图路径


var pageRoutes=require("./routes/pageRoutes");//页面路由
var apiRoutes=require("./routes/apiRoutes");//api路由
var crawRoutes=require("./routes/crawRoutes");//api路由


//上、下午收盘前找出 T 字形股票
schedule.scheduleJob(timeRules.beforeAmClose, crawAllSlotsAndSearchOneDayT);
schedule.scheduleJob(timeRules.beforePmClose, crawAllSlotsAndSearchOneDayT);


//每天晚上6:10爬取数据  完善数据库股票的历史数据
schedule.scheduleJob(timeRules.excludeWeekends18, crawHistoryDataAll);
schedule.scheduleJob(timeRules.everyNight20, selectHuiTiaoToAverageLineAllType);



async function all(){

	// await crawAllSlotsAndSearchOneDayT();//抓取数据
	// await crawHistoryDataAll();//抓取所有股票的历史数据
	// await selectAllAverageUp();
	// await selectHuiTiaoToAverageLineAllType();

	// await selectHuiTiaoToAverageLineAllType();
	
	// await crawHistoryDataOne("600027","2016-05-26");
	// await selectSingleSunKeepedDays();
	await testSearchOneCodeSingleSunKeepedDays("603833");
}

all();


app.use("/",pageRoutes);
app.use("/",apiRoutes);
app.use("/",crawRoutes);

app.listen(3000);