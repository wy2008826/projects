
var express=require("express");
var route=express.Router();

let crawAllSlots =require("./controllers/crawAllSlots.js");
let crawAllSlotsFinance =require("./controllers/crawAllSlotsFinance.js");


route.get("/craw/crawAllSlots",crawAllSlots);
route.get("/craw/crawAllSlotsFinance",crawAllSlotsFinance);

module.exports=route;