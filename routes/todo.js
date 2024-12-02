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
*/
);

router.get(
  "/",
  [isAuth, todoControllers.getTodo]
  /*  #swagger.tags = ['Todos - 待辦清單']
    #swagger.summary = '取得Todo'
    #swagger.description = '取得代辦事項' 
 */
);
router.delete(
  "/:id",
  [isAuth, todoControllers.deleteTodo] /*  #swagger.tags = ['Todos - 待辦清單']
    #swagger.summary = '刪除Todo'
    #swagger.description = '刪除代辦事項' 
*/
);
router.patch(
  "/:id/toggle",
  [isAuth, todoControllers.updateTodo] /*  #swagger.tags = ['Todos - 待辦清單']
    #swagger.summary = '更新Todo狀態'
    #swagger.description = '更新代辦事項狀態' 
*/
);
module.exports = router;
