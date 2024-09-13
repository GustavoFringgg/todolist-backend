const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todoControllers");

router.post("/", todoControllers.addTodo);
router.get("/", todoControllers.getTodo);
router.delete("/:id", todoControllers.deleteTodo);
router.put("/:id", todoControllers.updateTodo);
module.exports = router;
