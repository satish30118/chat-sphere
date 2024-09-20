const User = require("../models/userModel");
const generateToken = require("../helpher/generateToken");
const {
  hashPassword,
  comparePassword,
} = require("../helpher/passwordSecurity");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validating required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all the fields." });
    }
    // Checking if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "User not registered." });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await user.matchPassword(password);
    if (isPasswordValid) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

const FindUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve users." });
  }
};

module.exports = { registerUser, userLogin, FindUsers };
