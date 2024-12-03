var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");
const { isAuth } = require("../utils/TokenCheck");
router.post(
  "/sign_up",
  userControllers.sign_up
  /*  #swagger.tags = ['Users -使用者']
    #swagger.summary = '註冊會員'
    #swagger.description = '新增會員資料' 
    #swagger.parameters['body'] = {
    in: 'body',
    description: '註冊所需欄位',
    required: true,
    schema: {
    $nickname: '王小明',
    $email: '987654321@gmail.com',
    $password: 'Aa123456',
    $confirmPassword:'Aa123456'
    }
    }
    #swagger.responses[201] = {
    schema: { 
    "status": "success",
    "user": {
    "token": "token",
    "name": "王小明"
    },
    "Issued_At": "2024/12/2 下午11:46:41",
    "Expires_At": "2024/12/4 下午11:46:41",
    "Expires_Day": 2
    }
    }
    #swagger.responses[422] = {
    schema: { 
    "message":{
        type: "array",
        items: {
          type: "string",
          examples: [
            "暱稱不能少於兩個字元",
            "密碼需包含至少一個字母和一個數字,並且至少6個字符長",
            "密碼不一致！",
            "Email 格式不正確"
          ]
        }},
    "error": {
    "statusCode": 422,
    "isOperational": true   
    }
    }
    }
    #swagger.responses[402] = {
    schema: { 
    "message": "欄位未填寫正確！",
    "error": {
    "statusCode":402,
    "isOperational": true
    }
    }
    }
    #swagger.responses[409] = {
    schema: { 
    "message": "信箱已註冊過~",
    "error": {
    "statusCode": 409,
    "isOperational": true
    }
    }
    }
 */
);
router.post(
  "/sign_in",
  userControllers.sign_in
  /*  #swagger.tags = ['Users -使用者']
    #swagger.summary = '登入會員'
    #swagger.description = '登入資訊'
    #swagger.parameters['body'] = {
    in: 'body',
    description: '登入所需欄位',
    required: true,
    schema: {
    $email: '987654321@gmail.com',
    $password: 'Aa123456',
    }
    }
    #swagger.responses[200] = {
    schema: { 
    "status": "success",
    "user": {
    "token": "token",
    "name": "王小明"
    },
    "Issued_At": "2024/12/2 下午11:46:41",
    "Expires_At": "2024/12/4 下午11:46:41",
    "Expires_Day": 2
    }
    }
    #swagger.responses[401] = {
    schema: { 
    "message": "帳號或密碼輸入錯誤",
    "error": {
    "statusCode": 401,
    "isOperational": true
    }
    }
    }
        #swagger.responses[402] = {
    schema: { 
    "message": "帳號密碼不可為空",
    "error": {
    "statusCode": 402,
    "isOperational": true
    }
    }
    }
*/
);

router.get(
  "/checkout",
  [isAuth, userControllers.tokencheck]
  /*  #swagger.tags = ['Users -使用者']
    #swagger.summary = '檢查 Token'
    #swagger.description = '檢查 Token 是否有效' 
    */
);
router.post(
  "/sign_out",
  userControllers.sign_out
  /*  #swagger.tags = ['Users -使用者']
    #swagger.summary = '登出會員'
    #swagger.description = '刪除代辦事項' 
    */
);

module.exports = router;
