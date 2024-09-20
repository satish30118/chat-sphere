const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userModel.pre("save", async function (next) {
  const salt = 10;
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = new mongoose.model("User", userModel);
module.exports = User;
