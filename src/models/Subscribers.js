const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
   email:{
    type:String
   }
  },
  {
    timestamps: true,
  }
);



exports.Subscribers = mongoose.model("Subscribers", Schema);
