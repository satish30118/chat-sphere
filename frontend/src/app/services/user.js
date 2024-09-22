import axios from "axios";
const data = (localStorage.getItem("userInfo"));
var userInfo;
if(data){
   userInfo = JSON.parse(data)
};

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userInfo?.token}`,
  },
};

export const findUsers = async (search) => {
  try {
    const { data } = await axios.get(
      `/api/v1/user/find?search=${search}`,
      config
    );
    return data;
  } catch (error) {
    return;
  }
};

