var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/sign_up", userControllers.sign_up);
router.post("/sign_in", userControllers.sign_in);
// router.get("/checkout", userControllers.getTodo);
// router.post("/sign_out", userControllers.deleteTodo);
module.exports = router;
