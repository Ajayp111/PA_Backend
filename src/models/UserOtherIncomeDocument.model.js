const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    income: {
      type: Number,
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
    },
    format: {
      type: String,
    },

    link: {
      type: String,
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

exports.OtherIncomeUserDocs = mongoose.model("OtherIncomeUserDocs", Schema);
