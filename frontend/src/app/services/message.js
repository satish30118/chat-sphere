"use client";
import axios from "axios";

export const findMessages = async (chatId) => {
  const { data } = await axios.get(`/api/v1/message/${chatId}`);
  return data;
};

export const sendMsg = async (chatId, content) => {
  const { data } = await axios.post("/api/v1/message/send", {
    chatId,
    content,
  });
  return data;
};
