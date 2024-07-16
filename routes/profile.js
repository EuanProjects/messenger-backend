const express = require("express");
const router = express.Router();

const profileController = require("../controller/profile");

router.get("/", profileController.profileGet);
router.post("/", profileController.profilePost);
router.put("/:profileId", profileController.profilePut)
router.get("/:profileId/friends", profileController.profileFriendsGet);

module.exports = router;