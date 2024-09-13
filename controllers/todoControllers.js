const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const Post = require("../model/todomodel");
const mongoose = require("mongoose");

const addTodo = async (req, res, next) => {
  const { todos, user } = req.body;
  if (todos != undefined && todos.trim()) {
    const newTodo = await Post.create({ user, todos });
    return handleSuccess(res, "新增貼文成功", newTodo);
  } else {
    return next(appError(400, "你沒有填寫 todo 資料"));
  }
};

const getTodo = async (req, res, next) => {
  const todo = await Post.find();

  if (todo.length !== 0) {
    return handleSuccess(res, todo, `目前共有${todo.length}則貼文`);
  } else return handleSuccess(res, "尚未有任何貼文");
};

const deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(appError(400, "無效的貼文 ID"));
  }

  await Post.deleteOne({ _id: id });
  handleSuccess(res, "貼文刪除成功");
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const { newTodo } = req.body;
  const update = await Post.updateOne({ _id: id }, { todos: newTodo });
  console.log(update);
  handleSuccess(res, "更新貼文成功", update);
};

module.exports = {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo,
};
