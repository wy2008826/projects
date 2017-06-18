
var express=require("express");
var route=express.Router();

let crawAllSlotsAndSearchOneDayT =require("./controllers/crawAllSlotsAndSearchOneDayT.js");
let crawAllSlotsFinance =require("./controllers/crawAllSlotsFinance.js");
let crawHistoryDataOne=require("./controllers/crawHistoryDataOne.js");

route.get("/craw/crawAllSlotsAndSearchOneDayT",crawAllSlotsAndSearchOneDayT);
route.get("/craw/crawAllSlotsFinance",crawAllSlotsFinance);
route.get("/craw/crawHistoryDataOne",crawHistoryDataOne);//抓取某只股票的历史数据


module.exports=route;