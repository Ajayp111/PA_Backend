const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
   amount:{
    type:Number
   },
   date:{
    type:Date
   },
   user:{
    type:mongoose.Schema.Types.ObjectId
   }
  },
  {
    timestamps: true,
  }
);



exports.Reveneu = mongoose.model("Reveneu", Schema);
