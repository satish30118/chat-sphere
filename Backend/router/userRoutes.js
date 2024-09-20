const express = require("express");
const { registerUser, userLogin, FindUsers } = require("../controller/userController");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/find", FindUsers);

module.exports = router;
