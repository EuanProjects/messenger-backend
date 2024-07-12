const express = require("express");
const router = express.Router();
const loginController = require("../controller/login");

router.post("/", loginController.loginPost);

module.exports = router;