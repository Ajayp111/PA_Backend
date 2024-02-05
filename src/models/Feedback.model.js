const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
      },
      middle: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    rating: {
      type: Number,
    },
    anyOtherQuestion: {
      type: String,
    },
    orderId: {
      type: String,
    },
    description: {
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

exports.Feedback = mongoose.model("Feedback", Schema);
