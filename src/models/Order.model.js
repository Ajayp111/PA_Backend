const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    otherIncomeSources: {
      type: Array,
    },
    sessionId: {
      type: String,
    },
    fileFor: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      title: {
        type: String,
      },
      price: {
        type: Number,
      },
      discount: {
        type: Number,
      },
    },
    status: {
      type: String,
      enum: [
        "In Progress",
        "Completed",
        "Pending",
        "Payment Pending",
        "Cancelled",
      ],
      default: "Pending",
    },
    total_tax: {
      type: Number,
    },
    total_tax_description: {
      type: String,
    },
    type_of_order: {
      type: String,
    },
    payment: {
      type: Number,
    },
    payment_description: {
      type: String,
    },
    paymentId: {
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

exports.Order = mongoose.model("Order", Schema);
