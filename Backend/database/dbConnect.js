const mongoose = require("mongoose");
const db =
  process.env.MONGODB_URL ||
  "mongodb+srv://satishresearch369:YQr9o9wgVcZWVX6g@cluster0.ey3wm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    if (!db) {
      console.log("No db link available");
    }
    await mongoose.connect(db, {
      family: 4,
      serverSelectionTimeoutMS: 50000,
    });
    console.log("DATA BASE CONNECTED SUCCESSFULLY!!");
  } catch (error) {
    console.log("ERROR IN DB CONNECT:-  " + error);
  }
};

module.exports = connectDB;
