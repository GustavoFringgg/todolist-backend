const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Usermodel",
      required: [true, "貼文姓名未填寫"],
    },
    todos: {
      type: String,
      required: [true, "todos 未填寫"],
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("todomodel", todoSchema);
module.exports = Post;
