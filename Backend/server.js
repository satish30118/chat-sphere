const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./router/userRoutes");
const chatRoutes = require("./router/chatRoutes");
const messageRoutes = require("./router/messageRoutes");

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
app.use("/api/v1/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});

// Socket Connection
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chat-sphere-theta.vercel.app",
    // credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io with socket id:-", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User join with id:-", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessage) => {
    var chat = newMessage?.chatId;
    // console.log(newMessage)
    if (!chat?.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user?._id == newMessage.sender._id) return;

      socket.in(user?._id).emit("message recieved", newMessage);
    });
  });

  socket.on("calling", ({ roomid, selectedChat, callerId }) => {
    console.log(roomid, selectedChat, callerId);
    if (!selectedChat?.users) return console.log("calling users not defined");

    selectedChat?.users?.forEach((user) => {
      if (user?._id == callerId) return;

      socket.in(user?._id).emit("call recieved", roomid);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
