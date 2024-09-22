import axios from "axios";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userInfo?.token}`,
  },
};

export const findMessages = async (chatId) => {
  try {
    const { data } = await axios.get(
      `/api/v1/message/${chatId}`,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
