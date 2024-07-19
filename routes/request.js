const express = require("express");
const router = express.Router();
const requestController = require("../controller/request");

const authMiddleware = require("../middleware/auth");

router.use(authMiddleware.verifyToken);
router.use(authMiddleware.verify);


router.post("", requestController.requestPost); 
router.get("/profile/:profileId", requestController.requestGet);
router.put("/:requestId", requestController.requestPut);
router.delete("/:requestId", requestController.requestDelete);

module.exports = router;