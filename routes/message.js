const express = require("express");
const router = express.Router();

const messageController = require("../controller/message");

router.post("/:conversationId", messageController.messagesPost);
router.get("/:conversationId", messageController.messageGet);

module.exports = router;