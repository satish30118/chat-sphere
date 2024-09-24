"use client";

import axios from "axios";

export const findChats = async () => {
  const { data } = await axios.get("/api/v1/chat/");
  return data;
};

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};
export const getSenderPic = (loggedUser, users) => {
  return users[0]._id === loggedUser?._id ? users[1]?.pic : users[0]?.pic;
};
export const getSenderFull = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (messages, msg, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== msg.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, msg, index, userId) => {
  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === msg.sender._id &&
    messages[index].sender._id !== userId
  )
    return 33;
  else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== msg.sender._id &&
      messages[index].sender._id !== userId) ||
    (index === messages.length - 1 && messages[index].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, msg, index) => {
  return index > 0 && messages[index - 1].sender._id === msg.sender._id;
};
