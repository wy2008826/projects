var mongoose=require("mongoose");
var ElevatorSchema=require("../schemas/elevator");
var Elevator=mongoose.model("Elevator",ElevatorSchema);

module.exports=Elevator;