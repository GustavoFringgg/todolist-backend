const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express"); //引入swagger ui
const swaggerFile = require("./swagger-output");

const todosRouter = require("./routes/todo");
const usersRouter = require("./routes/users");
const app = express();
app.use(cors());
require("./connections/sequelize"); //DB引入
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/todos", todosRouter);
// app.use("/auth", usersRouter);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use((req, res, next) => {
  res.status(404).send({
    status: false,
    message: "找不到網址",
  });
});

app.use((err, req, res, next) => {
  if (err.name == "SequelizeUniqueConstraintError") {
    err.message = "已重複註冊";
  }
  res.status(400).json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
