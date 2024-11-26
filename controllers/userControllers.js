const User = require("../model/usermodel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const mongoose = require("mongoose");
const appError = require("../utils/appError");
const { generateSendJWT } = require("../utils/JwtToken");
const handleErrorAsync = require("../utils/handleErrorAsync");
const sign_up = async (req, res, next) => {
  let { email, password, confirmPassword, nickname } = req.body;
  if (!validator.isLength(nickname, { min: 2 })) {
    return next(appError("400", "暱稱不能少於兩個字元", next));
  }
  if (!email || !password || !confirmPassword || !nickname) {
    return next(appError("400", "欄位未填寫正確！", next));
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    return next(
      appError(400, "密碼需包含至少一個字母和一個數字,並且至少6個字符長")
    );
  }
  if (password !== confirmPassword) {
    return next(appError("400", "密碼不一致！", next));
  }

  if (!validator.isEmail(email)) {
    return next(appError("400", "Email 格式不正確", next));
  }
  const user_email = await User.findOne({ email }); //true=>data false=>null

  if (user_email) {
    return next(appError(400, "信箱已註冊過~"));
  }

  //加密密碼;
  password = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    password,
    nickname,
  });
  //   handleSuccess(res, "新增會員成功");

  generateSendJWT(newUser, 201, res);
}; //newUser會夾帶monogodb的_id物件

const sign_in = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(appError(400, "帳號密碼不可為空", next));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(appError(400, "帳號輸入錯誤", next));
  }

  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    return next(appError(400, "密碼輸入錯誤", next));
  }

  generateSendJWT(user, 200, res);
};

const tokencheck = (req, res, next) => {
  res.json({ message: "Token 驗證成功", user: req.user });
};

const sign_out = (req, res, next) => {
  res.json({ message: "登出成功", user: req.user });
};
module.exports = { sign_in, sign_up, tokencheck, sign_out };
