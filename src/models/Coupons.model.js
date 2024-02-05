const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["percentage", "amount"],
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  timeStraps: {
    type: [Date],
    default: [],
  },
});

const YourModel = mongoose.model("Coupons", Schema);

module.exports = YourModel;
