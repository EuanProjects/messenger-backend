const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.verify);

const profileController = require("../controller/profile");

router.get("/", profileController.profilesGet);

module.exports = router;