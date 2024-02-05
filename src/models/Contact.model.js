const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
   name:{
    first:{
        type:String
    },
    middle:{
        type:String
    },
    last:{
        type:String
    }
   },
   phone:{
    type:String
   },
   email:{
    type:String
   },
   quez:{
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



exports.Contact = mongoose.model("Contact", Schema);
