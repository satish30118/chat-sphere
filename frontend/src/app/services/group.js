"use client";

import axios from "axios";

export const createGroup = async (groupChatName, selectedUsers) => {
  const { data } = await axios.post(`/api/v1/chat/group`, {
    groupName: groupChatName,
    users: JSON.stringify(selectedUsers.map((u) => u._id)),
  });
  return data;
};

export const addUser = async (chatId, userId) => {
  const { data } = await axios.put(`/api/v1/chat/add-to-group`, {
    chatId,
    userId,
  });
  return data;
};

export const removeUser = async (chatId, userId) => {
  const { data } = await axios.put(`/api/v1/chat/remove-from-group`, {
    chatId,
    userId,
  });
  return data;
};

export const renameGroup = async (chatId, chatName) => {
  const { data } = await axios.put(`/api/v1/chat/rename-groupchat`, {
    chatId,
    chatName,
  });
  return data;
};
