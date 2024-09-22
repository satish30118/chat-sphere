"use client"

import axios from "axios";
const data = (localStorage.getItem("userInfo"));
var userInfo;
if(data){
   userInfo = JSON.parse(data)
}
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userInfo?.token}`,
  },
};

export const findChats = async () => {
  try {
    const { data } = await axios.get("/api/v1/chat/", config);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getSender = (loggedUser, users) => {
  return users[0] === loggedUser?._id ? users[1]?.name : users[0]?.name;
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
