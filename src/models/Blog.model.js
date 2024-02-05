const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    picture: {
      type: String,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    keywords: {
      type: String,
    },
    timeToRead: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

exports.Blog = mongoose.model("Blog", Schema);
