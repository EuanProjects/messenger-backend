const express = require("express");
const router = express.Router();
const requestController = require("../controller/request");

router.post("", requestController.requestPost); 
router.get("/profile/:profileId", requestController.requestGet);
router.put("/:requestId", requestController.requestPut);
router.delete("/:requestId", requestController.requestDelete);

module.exports = router;