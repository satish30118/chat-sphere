const express = require("express");
const {
  registerUser,
  userLogin,
  FindUsers,
} = require("../controller/userController");
const { authenication } = require("../middleware/Authentication");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/find", authenication, FindUsers);

module.exports = router;
