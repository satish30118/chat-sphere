const express = require("express");
const { authenication } = require("../middleware/Authentication");
const { singleChat, createGroupChat, fetchAllChats, renameGroup, addToGroup, removeFromGroup } = require("../controller/chatController");

const router = express.Router();

router.route("/one-to-one").post(authenication, singleChat);
router.route("/group").post(authenication, createGroupChat);
router.route("/").get(authenication, fetchAllChats);
router.route("/rename-groupchat").put(authenication, renameGroup);
router.route("/add-to-group").put(authenication, addToGroup);
router.route("/remove-from-group").put(authenication, removeFromGroup);

module.exports = router;