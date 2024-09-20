const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid chatId or no contend passed");
    return res
      .status(400)
      .json({ message: "Invalid chatId or no contend passed" });
  }

  const newMessage = {
    sender: req.user._id,
    content,
    chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name email");
    message = await message.populate("chatId");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .populate("sender", "name email")
      .populate("chatId");

    return res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

module.exports = { fetchAllMessages, sendMessage };
