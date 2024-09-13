var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
const todosRouter = require("./routes/todo");
const usersRouter = require("./routes/users");
var app = express();
app.use(cors());
require("./connections"); //DB引入
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/todos", todosRouter);
// app.use("/auth", usersRouter);
app.use("/users", usersRouter);
app.use((req, res, next) => {
  res.status(404).send({
    status: false,
    message: "找不到網址",
  });
});

app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
