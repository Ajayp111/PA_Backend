const mongoose = require("mongoose")

const Schema = new mongoose.Schema(
  {
    question: {
      type: String
    },
    answer: {
      type: String
    }
  },
)

exports.FAQ = mongoose.model("FAQ", Schema)