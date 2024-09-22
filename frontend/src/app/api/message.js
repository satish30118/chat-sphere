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

export const findMessages = async (chatId) => {
  try {
    const { data } = await axios.get(`/api/v1/message/${chatId}`, config);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const sendMsg = async (chatId, content) => {
  try {
    const { data } = await axios.post(
      "/api/v1/message/send",
      { chatId, content },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
