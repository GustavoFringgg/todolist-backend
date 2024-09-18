var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/userControllers");
const { isAuth } = require("../utils/TokenCheck");
router.post("/sign_up", userControllers.sign_up);
router.post("/sign_in", userControllers.sign_in);
router.get("/checkout", [isAuth, userControllers.tokencheck]);
router.post("/sign_out", userControllers.sign_out);

module.exports = router;
