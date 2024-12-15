const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const { Todo, User } = require("../model/index");

// const mongoose = require("mongoose");

const addTodo = async (req, res, next) => {
  // const { todos } = req.body;
  // const { user } = req;
  // if (todos != undefined && todos.trim()) {
  //   const newTodo = await Post.create({ user: req.user._id, todos });
  return handleSuccess(res, "新增貼文成功");
};
//   } else {
//     return next(appError(400, "你沒有填寫 todo 資料"));
//   }
// };

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
