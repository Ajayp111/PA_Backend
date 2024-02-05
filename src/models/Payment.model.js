const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
   orderId:{
    type:String
   },
   otherIncomeSources:{
    type:Array
  },
  sessionId:{
    type:String
  },
   fileFor:{
    _id:{
      type:mongoose.Schema.Types.ObjectId
    },
    title:{
      type:String
    },
    price:{
      type:Number
     },
     discount:{
      type:Number
     },
   },
   status:{
    type:String,
    enum:["In Progress","Completed","Pending","Failed"],
    default:"Pending"
   },
   total_tax:{
    type:Number
   },
   payment:{
    type:Number
   },
   type:{
    type:String,
    enum:["Tax","Payment","Extra"],
    default:"Payment"
   },
   paymentId:{
    type:String
   },
   user:{
    type:mongoose.Schema.Types.ObjectId
   }
  },
  {
    timestamps: true,
  }
);



exports.Payment = mongoose.model("Payment", Schema);
