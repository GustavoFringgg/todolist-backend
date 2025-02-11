const appError = require("./appError");
const handleErrorAsync = require("./handleErrorAsync");
const jwt = require("jsonwebtoken");
const supabase = require("../connections/supabaseClient");
const isAuth = handleErrorAsync(async (req, res, next) => {
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(appError(401, "你尚未登入！", next));
  }

  // if (!token) {
  //   return next(appError(401, "你尚未登入！", next));
  // }
  // 驗證 token 正確性
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return next(appError(400, "token效期過期或token錯誤請重新登入"), next);
      } else {
        resolve(payload);
      }
    });
  });
  //decoded : payload{ mongodb_id,iat(製造日期),exp(過期日期) }
  if (!decoded || !decoded.id) {
    return next(appError(401, "Token 無效"));
  }

  // 使用 Supabase 查詢用戶
  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, nickname") // 取得需要的欄位
    .eq("id", decoded.id)
    .single(); // 只取一筆
  console.log("user", user);
  if (error || !user) {
    return next(appError(401, "用戶不存在"));
  }

  if (!user) {
    return next(appError(401, "用戶不存在"));
  }

  req.user = user;
  console.log("req", req.user);

  next();
});

module.exports = {
  isAuth,
};
