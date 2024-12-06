const swaggerOptions = {
  autoHeaders: false, // 禁止自動添加 headers
};
const swaggerAutogen = require("swagger-autogen")(swaggerOptions);

const doc = {
  //會有info物件
  info: {
    title: "ToDoList API ", //專案名稱
    description: "後端API文件", //描述這個文件在幹嘛
  },
  host: "localhost:3000", //如果上render記得改網址
  basePath: "/",
  schemes: ["http", "https"], //swagger支援什麼模式

  securityDefinitions: {
    apikeyAuth: {
      type: "apiKey",
      in: "headers",
      name: "authorization",
      description:
        "請在取得的 token 前補上 'Bearer' 再送出(須包含一空白字元)，範例：'Bearer {your token}'",
    },
  },
};

const outputFile = "./swagger-output.json"; //生成的檔案名稱
const endpointFile = ["./app.js"]; //帶入陣列，填入進入點

swaggerAutogen(outputFile, endpointFile, doc); //帶入三個參數 1.輸出檔案名稱 2.讀取檔案名稱 3.doc資料
