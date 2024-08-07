const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// router.use((req, res, next) => {
//     if (req.method === 'POST' && req.path === '/') {
//         next();
//     } else {
//         authMiddleware.verifyToken(req, res, () => {
//             authMiddleware.verify(req, res, next);
//         });
//     }
// });

const profileController = require("../controller/profile");

router.get("profile", profileController.profileGet);
router.get("/:profileId/friends", profileController.profileFriendsGet);
router.get("/:profileId", profileController.profileIdGet);

router.post("/", profileController.profilePost);
router.put("/:profileId", profileController.profilePut)

module.exports = router;