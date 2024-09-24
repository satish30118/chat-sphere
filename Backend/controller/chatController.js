const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const createSingleChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId not provided");
    return res.sendStatus(400);
  }

  try {
    const existingChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    const populatedChat = await User.populate(existingChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (existingChat.length > 0) {
      return res.status(200).json(populatedChat[0]);
    } else {
      const createdChat = await Chat.create({
        isGroupChat: false,
        users: [req.user._id, userId],
      });
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      return res.status(200).json(fullChat);
    }
  } catch (error) {
    console.error("Error accessing chat:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.groupName) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required for group chat" });
  }

  users.push(req.user._id);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.groupName,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error creating group chat:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const fetchAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    return res.status(200).json(populatedChats);
  } catch (error) {
    console.error("Error fetching chats:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName: chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.json(updatedChat);
  } catch (error) {
    console.error("Error renaming group:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const addedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if (!addedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }
console.log(addedChat)
    return res.status(200).json(addedChat);
  } catch (error) {
    console.error("Error adding to group:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const removedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    return res.json(removedChat);
  } catch (error) {
    console.error("Error removing from group:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSingleChat,
  createGroupChat,
  fetchAllChats,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
