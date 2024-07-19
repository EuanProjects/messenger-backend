const express = require("express");
const router = express.Router();
const conversationController = require("../controller/conversation");
const authMiddleware = require("../middleware/auth");

router.get('/', (req, res) => {
    res.send({ message: "messenger api" });
});

module.exports = router;