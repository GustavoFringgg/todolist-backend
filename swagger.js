const swaggerAutogen = require("swagger-autogen")();
const doc = {
  //會有info物件
  info: {
    title: "ToDoList API ", //專案名稱
    description: "後端API文件", //描述這個文件在幹嘛
  },
  host: "localhost:3000", //如果上render記得改網址
  schemes: ["http", "https"], //swagger支援什麼模式

  securityDefinitions: {
    apikeyAuth: {
      type: "apiKey",
      in: "headers",
      name: "authorization",
      description: "請加上api key",
    },
  },
};

const outputFile = "./swagger-output.json"; //生成的檔案名稱
const endpointFile = ["./app.js"]; //帶入陣列，填入進入點

swaggerAutogen(outputFile, endpointFile, doc); //帶入三個參數 1.輸出檔案名稱 2.讀取檔案名稱 3.doc資料
