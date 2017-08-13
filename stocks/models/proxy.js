var mongoose=require("mongoose");
var ProxySchema=require("../schemas/proxy");
var Proxy=mongoose.model("proxy",ProxySchema);

module.exports=Proxy;