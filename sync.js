const sequelize = require("./connections/sequelize");
const User = require("./model/new_usermodel");

(async () => {
  try {
    // 同步資料表
    await sequelize.sync({ alter: true }); // 使用 `alter: true` 同步表結構（非破壞性更新）
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  } finally {
    sequelize.close();
  }
})();
