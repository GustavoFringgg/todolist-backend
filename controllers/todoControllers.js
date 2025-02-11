const appError = require("../utils/appError");
const handleSuccess = require("../utils/handleSuccess");
const supabase = require("../connections/supabaseClient");

const addTodo = async (req, res, next) => {
  const { todos } = req.body;
  const { id } = req.user; // 從 req.user 取得用戶 ID

  if (!todos || !todos.trim()) {
    return next(appError(400, "你沒有填寫 todo 資料"));
  }

  // 插入 todo 到 Supabase
  const { data, error } = await supabase
    .from("todos")
    .insert([{ user_id: id, todos }])
    .select()
    .single();

  if (error) {
    return next(appError(500, "新增貼文失敗", error.message));
  }
  console.log("data", data);

  return handleSuccess(res, "新增貼文成功", data);
};

const getTodo = async (req, res, next) => {
  const { id } = req.user;
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*") // 取得所有欄位
    .eq("user_id", id); // 過濾條件，user_id = id

  if (error) {
    return next(appError(500, "取得待辦事項失敗", error.message));
  }

  if (todos.length === 0) {
    return handleSuccess(res, null, "該用戶沒有待辦事項");
  }

  return handleSuccess(res, todos, `目前共有 ${todos.length} 則貼文`);
};

const deleteTodo = async (req, res, next) => {
  const id = req.params.id; // 取得要刪除的 todo ID
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    return next(appError(500, "刪除失敗", error.message));
  }

  return handleSuccess(res, "貼文刪除成功");
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params; // 取得待辦事項 ID
  console.log("id", id);

  try {
    // 取得當前 todo 狀態
    const { data: todo, error: fetchError } = await supabase
      .from("todos")
      .select("id, status") // 只選取 id 和 status 欄位
      .eq("id", id)
      .single(); // 只回傳單筆資料

    if (fetchError || !todo) {
      return next(appError(404, "待辦事項不存在"));
    }

    // 切換 status（true => false, false => true）
    const newStatus = !todo.status;

    // 更新 status
    const { error: updateError } = await supabase
      .from("todos")
      .update({ status: newStatus })
      .eq("id", id);

    if (updateError) {
      return next(appError(500, "更新失敗", updateError.message));
    }

    handleSuccess(res, "更新成功", { id, status: newStatus });
  } catch (error) {
    return next(appError(500, "內部錯誤", error.message));
  }
};

module.exports = {
  addTodo,
  getTodo,
  deleteTodo,
  updateTodo,
};
