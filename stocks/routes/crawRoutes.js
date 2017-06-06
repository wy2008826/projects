
var express=require("express");
var route=express.Router();

let crawAllSlots =require("./controllers/crawAllSlots.js");
let crawAllSlotsFinance =require("./controllers/crawAllSlotsFinance.js");
let crawNowData=require("./controllers/crawNowData.js");

route.get("/craw/crawAllSlots",crawAllSlots);
route.get("/craw/crawAllSlotsFinance",crawAllSlotsFinance);
route.get("/craw/crawNowData",crawNowData);//抓取所有股票的当前数据


module.exports=route;