const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const { Todo, User } = require("../model/index");

// const mongoose = require("mongoose");

const addTodo = async (req, res, next) => {
  const { todos } = req.body;
  const { id } = req.user;
  console.log("todos", todos);
  console.log("id", id);

  if (todos != undefined && todos.trim()) {
    const todo = await Todo.create({ user_id: id, todos });
    return handleSuccess(res, "新增貼文成功", todo);
  } else {
    return next(appError(400, "你沒有填寫 todo 資料"));
  }
};

const getTodo = async (req, res, next) => {
  const { id } = req.user;
  //   const todo = await Todo.findAll({ where: { user_id: id } });
  const userWithTodos = await User.findByPk(id, {
    include: Todo, // 包含所有關聯的 Todo
  });

  if (userWithTodos.length !== 0) {
    return handleSuccess(
      res,
      userWithTodos,
      `目前共有${userWithTodos.Todos.length}則貼文`
    );
  } else return handleSuccess(res, null);
};

const deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  await Todo.destroy({ where: { id: id } });
  handleSuccess(res, "貼文刪除成功");
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);
  const { status } = req.body; // 假設前端傳遞新的狀態
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return next(appError(404, "待辦事項不存在"));
    }

    todo.status = status;
    await todo.save();
    handleSuccess(res, "更新成功", todo);
  } catch (error) {
    // 錯誤處理
    return next(appError(500, error));
  }
};

module.exports = {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo,
};
