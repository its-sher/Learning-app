const express = require("express");
const router = express.Router();
const userController = require("../controllers/attactmentController");

router.post("/:folder", userController.CreateAttachment);
router.put("/:folder", userController.Resize);
router.post("/uploadimgurl/url", userController.downloadFromUrl);
module.exports = router;
