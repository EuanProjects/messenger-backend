const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.verify);

const profileController = require("../controller/profile");

router.get("profile", profileController.profileGet);
router.get("profiles", profileController.profilesGet);
router.get("/:profileId/friends", profileController.profileFriendsGet);
router.get("/:profileId", profileController.profileIdGet);

router.post("/", profileController.profilePost);
router.put("/:profileId", profileController.profilePut)

module.exports = router;