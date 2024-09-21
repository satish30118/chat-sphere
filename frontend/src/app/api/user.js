import axios from "axios";
const user = JSON.parse(localStorage.getItem("userInfo"));

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${user.token}`,
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

