var mongoose=require("mongoose");
var ShopSchema=require("../../schemas/taobao/shop");
var Shop=mongoose.model("Shop",ShopSchema);

module.exports=Shop;