/**
 * Created by wangyu on 17/8/19.
 */
var mongoose=require("mongoose");
var VisitorSchema=require("../schemas/visitor");
var Visitor=mongoose.model("visitor",VisitorSchema);

module.exports=Visitor;