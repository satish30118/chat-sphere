const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./router/userRoutes");
const chatRoutes = require("./router/chatRoutes");

const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./database/dbConnect");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

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
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
