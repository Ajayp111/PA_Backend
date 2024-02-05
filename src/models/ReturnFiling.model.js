const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    isDiscountAble: {
      type: Boolean
    },
    discount: {
      type: Number,
    },
    discountAmount: {
      type: Number,
    },
    priceAfterDiscount: {
      type: Number,
    },
    features: [
      {
        type: String,
      },
    ],
    subText: {
      type: String,
    },
    requiredDetails: [
      {
        type: {
          type: String,
          enum: ["TEXT", "IMAGE", "PDF", "FILE"],
        },
        value: {
          type: String,
        },
        title: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

exports.ReturnFiling = mongoose.model("ReturnFiling", Schema);
