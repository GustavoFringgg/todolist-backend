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
    description: '註冊資訊',
    required: true,
    schema: {
                $nickname: '王小明',
                $email: '987654321@gmail.com',
                $password: 'Aa123456',
                $confirmPassword:'Aa123456'
        }
    }

 */
);
router.post(
  "/sign_in",
  userControllers.sign_in
  /*  #swagger.tags = ['Users -使用者']
    #swagger.summary = '登入會員'
    #swagger.description = '登入會員資料' 
    #swagger.parameters['body'] = {
    in: 'body',
    description: '登入資訊',
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
      status:false,
      message:'你尚未登入'
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
