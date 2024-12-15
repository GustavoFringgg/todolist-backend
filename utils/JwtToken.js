const jwt = require("jsonwebtoken");
const appError = require("./appError");
const handleErrorAsync = require("./handleErrorAsync");

// 產生 JWT token
const generateSendJWT = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });

  const decoded = jwt.decode(token);
  const issuedAt = new Date(decoded.iat * 1000).toLocaleString();
  const expiresAt = new Date(decoded.exp * 1000).toLocaleString();
  const createtime = decoded.iat;
  const expiretime = decoded.exp;
  const days = (expiretime - createtime) / (24 * 60 * 60);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    user: {
      token,
      name: user.nickname,
    },
    Issued_At: issuedAt,
    Expires_At: expiresAt,
    Expires_Day: days,
  });
};

module.exports = {
  generateSendJWT,
};
