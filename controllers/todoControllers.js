const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const Post = require("../model/todomodel");
const mongoose = require("mongoose");

const addTodo = async (req, res, next) => {
  const { todos } = req.body;
  const { user } = req;
  if (todos != undefined && todos.trim()) {
    const newTodo = await Post.create({ user: req.user._id, todos });
    return handleSuccess(res, "新增貼文成功", newTodo);
  } else {
    return next(appError(400, "你沒有填寫 todo 資料"));
  }
};

const getTodo = async (req, res, next) => {
  const { _id } = req.user;
  const todo = await Post.find({ user: _id });
  if (todo.length !== 0) {
    return handleSuccess(res, todo, `目前共有${todo.length}則貼文`);
  } else return handleSuccess(res, null);
};

const deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(appError(400, "無效的貼文 ID"));
  }

  await Post.deleteOne({ _id: id });
  handleSuccess(res, "貼文刪除成功");
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Post.findById(id);
    if (!todo) {
      return next(appError(404, "待辦事項不存在"));
    }

    todo.status = !todo.status;
    await todo.save();
    handleSuccess(res, "更新成功", todo);
  } catch (error) {
    // 錯誤處理
    return next(appError(500, "更新失敗"));
  }
};

module.exports = {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo,
};
