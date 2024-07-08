const express = require("express");
const router = express.Router();

const conversationController = require("../controller/conversation");

router.get("/:conversationId", conversationController.conversationDetail);
router.get("/profile/:profileId", conversationController.conversationDetailProfileId);
router.get("/", conversationController.conversationAllDetail);

router.post("/", conversationController.conversationPost);

router.put("/:conversationId/theme", conversationController.conversationThemePut);

module.exports = router;