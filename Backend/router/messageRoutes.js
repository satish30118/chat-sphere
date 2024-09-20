const express = require("express");
const { authenication } = require("../middleware/Authentication");
const { sendMessage, fetchAllMessages } = require("../controller/messageController");

const router = express.Router();

router.route("/send").post(authenication, sendMessage);
router.route("/:chatId").get(authenication, fetchAllMessages);

module.exports = router;
