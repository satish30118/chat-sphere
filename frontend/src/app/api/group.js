import axios from "axios";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${userInfo.token}`,
  },
};