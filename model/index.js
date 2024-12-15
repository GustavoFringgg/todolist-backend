const { Sequelize } = require("sequelize");
const sequelize = require("../connections/sequelize");

const User = require("./new_usermodel");
const Todo = require("./new_todomodel");

User.hasMany(Todo, { foreignKey: "user_id" });
Todo.belongsTo(User, { foreignKey: "user_id" });
module.exports = {
  sequelize,
  User,
  Todo,
};
