
var express=require("express");
var route=express.Router();

let crawAllSlotsAndSearchOneDayT =require("./controllers/crawAllSlotsAndSearchOneDayT.js");
let crawAllSlotsFinance =require("./controllers/crawAllSlotsFinance.js");
let crawNowData=require("./controllers/crawNowData.js");
let crawHistoryDataOne=require("./controllers/crawHistoryDataOne.js");

route.get("/craw/crawAllSlotsAndSearchOneDayT",crawAllSlotsAndSearchOneDayT);
route.get("/craw/crawAllSlotsFinance",crawAllSlotsFinance);
route.get("/craw/crawNowData",crawNowData);//抓取所有股票的当前数据
route.get("/craw/crawHistoryDataOne",crawHistoryDataOne);//抓取某只股票的历史数据


module.exports=route;