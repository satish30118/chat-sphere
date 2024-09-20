const bcrypt = require("bcryptjs");

// Function to hash a password
const hashPassword = async (password) => {
  try {
    if (!password) {
      console.log("No Password Found for Hashing");
      return false;
    }
    const saltRounds = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error in hashing password: ", error.message);
    return false;
  }
};

// Function to compare passwords
const comparePassword = async (userPassword, storedPassword) => {
  try {
    if (!userPassword || !storedPassword) {
      console.log("Missing passwords for comparison");
      return false;
    }
    const isMatch = await bcrypt.compare(userPassword, storedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error in comparing passwords: ", error.message);
    return false;
  }
};

module.exports = { hashPassword, comparePassword };
