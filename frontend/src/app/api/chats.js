import axios from "axios";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userInfo.token}`,
  },
};

export const findChats = async () => {
    try {
       const { data } = await axios.get("/api/v1/chat/", config);
      return data;
    } catch (error) {
      console.log(error)
      return;
    }
  };

  export const getSender = (users) => {
    return users[0]?._id === userInfo?._id ? users[1].name : users[0].name;
  };
