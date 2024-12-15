const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todoControllers");

const { isAuth } = require("../utils/TokenCheck");

router.post(
  "/",
  [isAuth, todoControllers.addTodo]
  /*  #swagger.tags = ['Todos - 待辦清單']
    #swagger.summary = '新增Todo'
    #swagger.description = '新增代辦事項' 
    #swagger.security = [{ "apikeyAuth": [] }]
    #swagger.responses[200] = {
    schema: { 
    "status": true,
    "message": "新增貼文成功",
    "data": {
    "user": "674e6245a0e16ca1dfebe0ce",
    "todos": "any",
    "status": false,
    "_id": "67515776731145660b5c18de",
    "createdAt": "2024-12-05T07:34:14.076Z"
    }
    }
    }
    #swagger.responses[400] = {
    schema: { 
    "message": "你沒有填寫 todo 資料",
    "error": {
    "statusCode": 400,
    "isOperational": true
    }
    }
    }    
*/
);

router.get(
  "/",
  [isAuth, todoControllers.getTodo]
  /*  #swagger.tags = ['Todos - 待辦清單']
    #swagger.summary = '取得Todo'
    #swagger.description = '取得代辦事項' 
    #swagger.security = [{ "apikeyAuth": [] }]
    #swagger.responses[200] = {
    schema: { 
    "status": true,
    "message": [
    {
    "_id": "6751586bae28a79ad3daf769",
    "user": "674e6245a0e16ca1dfebe0ce",
    "todos": "any",
    "status": false,
    "createdAt": "2024-12-05T07:38:19.235Z"
    }
    ],
    "data": "目前共有1則貼文"
    }
    }
 */
);
router.delete(
  "/:id",
  [isAuth, todoControllers.deleteTodo] /*  #swagger.tags = ['Todos - 待辦清單']
    #swagger.summary = '刪除Todo'
    #swagger.description = '刪除代辦事項' 
    #swagger.security = [{ "apikeyAuth": [] }]
    #swagger.responses[200] = {
    schema: { 
    "status": true,
    "message": "貼文刪除成功"
    }
    }
    #swagger.responses[400] = {
    schema: { 
    "message": "無效的貼文 ID",
    "error": {
    "statusCode": 400,
    "isOperational": true
    }
    }
    }    
*/
);
router.patch(
  "/:id/toggle",
  [isAuth, todoControllers.updateTodo] /*  #swagger.tags = ['Todos - 待辦清單']
    #swagger.summary = '更新Todo狀態'
    #swagger.description = '更新代辦事項狀態' 
    #swagger.security = [{ "apikeyAuth": [] }]
    #swagger.responses[200] = {
    schema: { 
    "status": true,
    "message": "更新成功",
    "data": {
    "_id": "6751586bae28a79ad3daf769",
    "user": "674e6245a0e16ca1dfebe0ce",
    "todos": "any",
    "status": true,
    "createdAt": "2024-12-05T07:38:19.235Z"
    }
    }
    }
    #swagger.responses[404] = {
    schema: { 
    "message": "待辦事項不存在",
    "error": {
    "statusCode": 404,
    "isOperational": true
    }
    }
    } 
    #swagger.responses[500] = {
    schema: { 
    "message": "更新失敗",
    "error": {
    "statusCode": 500,
    "isOperational": true
    }
    }
    } 
*/
);
module.exports = router;
