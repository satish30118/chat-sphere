const express = require("express");
const {
  registerUser,
  userLogin,
  FindUsers,
} = require("../controller/userController");
const { authenication } = require("../middleware/Authentication");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/find").get(authenication, FindUsers);

module.exports = router;
