const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todoControllers");
const { isAuth } = require("../utils/TokenCheck");
router.post("/", [isAuth, todoControllers.addTodo]);
router.get("/", [isAuth, todoControllers.getTodo]);
router.delete("/:id", [isAuth, todoControllers.deleteTodo]);
router.put("/:id", todoControllers.updateTodo);
module.exports = router;