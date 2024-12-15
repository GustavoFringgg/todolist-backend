const { DataTypes } = require("sequelize");
const sequelize = require("../connections/sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID, // 對應 UUID
      defaultValue: DataTypes.UUIDV4, // 自動生成 UUID
      primaryKey: true, // 主鍵
    },
    nickname: {
      type: DataTypes.STRING, // 對應 VARCHAR
      allowNull: false, // NOT NULL
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // 唯一值
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // 最少 8 碼，最多 100 碼
      },
    },
    created_at: {
      type: DataTypes.DATE, // 對應 TIMESTAMP
      defaultValue: DataTypes.NOW, // 預設為當前時間
    },
  },
  {
    tableName: "users", // 對應資料表名稱
    timestamps: false, // 禁用 Sequelize 自動生成的 createdAt 和 updatedAt
    hooks: {
      beforeValidate(user) {
        if (user.nickname) {
          user.nickname = user.nickname.trim();
        }
        if (user.email) {
          user.email = user.email.trim().toLowerCase();
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ["password", "email"] }, //排除回傳password email
    },
    scopes: {
      withSensitiveData: {
        attributes: {}, // 呼叫scopes(withSensitiveData)返回所有欄位
      },
    },
  }
);

module.exports = User;
