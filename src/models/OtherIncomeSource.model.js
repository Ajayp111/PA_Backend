const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    format: {
      type: String,
      enum: ["JPEG", "PDF", "PNG"],
      default: "PDF",
    },
    maximumSize: {
      type: String,
    },
    text: {
      type: String,
    },
    income: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

exports.OtherIncomeSource = mongoose.model("OtherIncomeSource", Schema);
