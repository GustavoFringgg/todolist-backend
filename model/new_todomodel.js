const { DataTypes } = require("sequelize");
const sequelize = require("../connections/sequelize");

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    todos: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"), // ENUM 定義
      defaultValue: "pending", // 預設值
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "todos", // 明確指定資料表名稱為小寫
    timestamps: false, // 禁用默認的 `createdAt` 和 `updatedAt`
  }
);

module.exports = Todo;
