var mongoose=require("mongoose");
var StockSchema=require("../schemas/stock");
var Stock=mongoose.model("stock",StockSchema);

module.exports=Stock;