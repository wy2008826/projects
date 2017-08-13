
var express=require("express");
var route=express.Router();

let crawAllSlotsAndSearchOneDayT =require("./controllers/crawAllSlotsAndSearchOneDayT.js");
let crawAllSlotsFinance =require("./controllers/crawAllSlotsFinance.js");

route.get("/craw/crawAllSlotsAndSearchOneDayT",crawAllSlotsAndSearchOneDayT);
route.get("/craw/crawAllSlotsFinance",crawAllSlotsFinance);


module.exports=route;