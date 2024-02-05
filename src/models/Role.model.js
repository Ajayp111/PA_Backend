const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
  },
  permissions: [
    {
      type: String,
    },
  ],
});

exports.Role = mongoose.model("Role", Schema);
