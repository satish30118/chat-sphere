import axios from "axios";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userInfo.token}`,
  },
};

export const createGroup = async (groupChatName, selectedUsers) => {
  try {
    const { data } = await axios.post(
      `/api/v1/chat/group`,
      {
        groupName: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const addUser = async (chatId, userId) => {
  try {
    const { data } = await axios.put(
      `/api/v1/chat/add-to-group`,
      {
        chatId,
        userId,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const removeUser = async (chatId, userId) => {
  try {
    const { data } = await axios.put(
      `/api/v1/chat/remove-from-group`,
      {
        chatId,
        userId,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const renameGroup = async (chatId, chatName) => {
  try {
    const { data } = await axios.put(
      `/api/v1/chat/rename-groupchat`,
      {
        chatId,
        chatName,
      },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
