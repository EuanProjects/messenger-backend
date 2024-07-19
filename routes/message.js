const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.verify);

const messageController = require("../controller/message");

router.post("/:conversationId", messageController.messagesPost);
router.get("/:conversationId", messageController.messageGet);

module.exports = router;