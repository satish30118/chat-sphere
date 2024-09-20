const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config(); 
const connectDB = require("./database/dbConnect");


// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// DATA BASE CONNECTION //
connectDB(); 

// DEFAULT ROUTE //
app.get("/", (req, res) => {
    res.send("Hello, backend is live.");
  });

  // Routes //
  app

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`server run at ${PORT}`)
})

