const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// 替換為你的 Render 提供的資料庫連線 URL
const sequelize = new Sequelize(
  process.env.PostgreSql, //External Database URL
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // Render 的資料庫需要啟用 SSL
        rejectUnauthorized: false, // 忽略未授權的憑證（因為 Render 使用自簽憑證）
      },
    },
    logging: false, // 禁用日誌
  }
);

// 測試連接
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
