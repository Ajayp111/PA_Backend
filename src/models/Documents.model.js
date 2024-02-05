const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    format: [
      {
        type: String,
      },
    ],
    max_size: {
      type: Number,
    },
    type: {
      type: String,
    },
    editAble: {
      type: Boolean,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

exports.Documents = mongoose.model("Documents", Schema);
