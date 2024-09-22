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
router.route("/authentication").get(authenication, (req, res) => {
  res.status(200).json({ status: true, message: "Verifyed Successfully" });
});

module.exports = router;
