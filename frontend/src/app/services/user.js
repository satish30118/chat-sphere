import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const findUsers = async (search) => {
  const { data } = await axios.get(`/api/v1/user/find?search=${search}`);
  return data;
};

export const googleLogin = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse?.credential);
  // console.log(decoded);
  const { data } = await axios.post(`/api/v1/user/google-login`, {
    email: decoded?.email,
  });
  return data;
};

export const googleSignUp = async (credentialResponse) => {
  const decoded = jwtDecode(credentialResponse?.credential);
  // console.log(decoded);
  const user = {
    name: decoded?.name,
    email: decoded?.email,
    password: Date.now(),
    pic: decoded?.picture,
  };
  const { data } = await axios.post(`/api/v1/user/google-signup`, user)
  return data;
};
