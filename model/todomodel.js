const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "貼文姓名未填寫"],
    },
    todos: {
      type: String,
      required: [true, "todos 未填寫"],
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("todomodel", todoSchema);
module.exports = Post;
