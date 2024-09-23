const express = require("express");
const { authenication } = require("../middleware/Authentication");
const { sendMessage, fetchAllMessages } = require("../controller/messageController");
// const { askGPT } = require("../controller/connectBot");

const router = express.Router();

router.route("/send").post(authenication, sendMessage);
router.route("/:chatId").get(authenication, fetchAllMessages);
// router.route("/openai-chat").post(authenication, askGPT);

module.exports = router;
