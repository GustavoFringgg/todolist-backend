const appError = require("./appError");
const handleErrorAsync = require("./handleErrorAsync");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const isAuth = handleErrorAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token = req.headers.authorization;
  //   if (req.headers.authorization) {
  //     token = req.headers.authorization.split(" ")[1];
  //     console.log("here");
  //   }

  if (!token) {
    return next(appError(401, "你尚未登入！", next));
  }
  // 驗證 token 正確性
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return next(appError(400, "token效期過期請重新登入"));
      } else {
        resolve(payload);
      }
    });
  });
  //decoded : payload{ mongodb_id,iat(製造日期),exp(過期日期) }
  if (!decoded || !decoded.id) {
    return next(appError(401, "Token 無效"));
  }

  const currentUser = await User.findById(decoded.id).select(
    "+email +createdAt"
  );

  //currentUser =>整包會員資料

  if (!currentUser) {
    return next(appError(401, "用戶不存在"));
  }

  req.user = currentUser;

  next();
});

module.exports = {
  isAuth,
};
