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

let testSearchAllCodeSingleSunKeepedDays=require("./testStrategy/testSearchAllCodeSingleSunKeepedDays");
let testSearchOneCodeAllT=require('./testStrategy/testSearchOneCodeAllT');

app.use(express.static(__dirname+"/"));//设置静态资源路径
app.set("view engine","hbs");//设置模板引擎
app.set("views",__dirname+"/views");//设置视图路径


var pageRoutes=require("./routes/pageRoutes");//页面路由
var apiRoutes=require("./routes/apiRoutes");//api路由
var crawRoutes=require("./routes/crawRoutes");//api路由


//上、下午收盘前找出 T 字形股票
schedule.scheduleJob(timeRules.beforeAmClose, function(){
	crawAllSlotsAndSearchOneDayT("email");
});
schedule.scheduleJob(timeRules.beforePmClose, function(){
	crawAllSlotsAndSearchOneDayT("email");
});


//每天晚上6:10爬取数据  完善数据库股票的历史数据
schedule.scheduleJob(timeRules.excludeWeekends18, async function(){
	await crawAllSlotsAndSearchOneDayT();
	await crawHistoryDataAll();
});

//每天晚上搜索单阳不破de
schedule.scheduleJob(timeRules.everyNight20, async function(){
	await selectSingleSunKeepedDays("email");
});



async function all(){

	// let suits_OneDayT=await crawAllSlotsAndSearchOneDayT();//抓取数据
	
	// await crawHistoryDataAll();//抓取所有股票的历史数据
	// let suits_keepDays=await selectSingleSunKeepedDays();
	
	
	// await selectAllAverageUp();
	// await selectHuiTiaoToAverageLineAllType();

	// await testSearchAllCodeSingleSunKeepedDays();
	// await testSearchOneCodeAllT("603133");


	// console.log("one day T:",suits_OneDayT);
	// console.log("Single sun keeped days:",suits_keepDays);

}

all();


app.use("/",pageRoutes);
app.use("/",apiRoutes);
app.use("/",crawRoutes);

app.listen(3000);

