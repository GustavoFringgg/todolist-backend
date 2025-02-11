const bcrypt = require("bcryptjs");
const validator = require("validator");
const appError = require("../utils/appError");
const { generateSendJWT } = require("../utils/JwtToken");
const supabase = require("../connections/supabaseClient");

const sign_up = async (req, res, next) => {
  let { email, password, confirmPassword, nickname } = req.body;
  if (!validator.isLength(nickname, { min: 2 })) {
    return next(appError(422, "暱稱不能少於兩個字元", next));
  }
  if (!email || !password || !confirmPassword || !nickname) {
    return next(appError(402, "欄位未填寫正確！", next));
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    return next(
      appError(422, "密碼需包含至少一個字母和一個數字,並且至少6個字符長")
    );
  }
  if (password !== confirmPassword) {
    return next(appError(422, "密碼不一致！", next));
  }

  if (!validator.isEmail(email)) {
    return next(appError(422, "Email 格式不正確", next));
  }

  //加密密碼;
  password = await bcrypt.hash(password, 12);
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        nickname,
        email,
        password,
      },
    ])
    .select("*"); // 返回所有欄位的資料

  if (error && error.code == 23505) {
    console.error("Error creating user:", error);
    return next(appError(422, "已經註冊過囉", next));
  }
  generateSendJWT(data, 201, res);
};

const sign_in = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(appError(402, "帳號密碼不可為空", next));
  }
  // 查詢用戶
  const { data: user, error } = await supabase
    .from("users")
    .select("id, nickname, email, password")
    .eq("email", email)
    .single(); // 只取一筆資料

  if (error || !user) {
    return next(appError(404, "用戶不存在"));
  }
  // 驗證密碼
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return next(appError(401, "帳號或密碼輸入錯誤"));
  }
  user.password = "";
  // 生成 JWT 並回傳
  generateSendJWT(user, 200, res);
};

const tokencheck = async (req, res, next) => {
  res.status(200).json({ message: "Token 驗證成功", user: req.user });
};

const sign_out = async (req, res, next) => {
  res.clearCookie("userToken", { path: "/" });
  res.status(200).json({ message: "登出成功", user: req.user });
};
module.exports = { sign_in, sign_up, tokencheck, sign_out };
