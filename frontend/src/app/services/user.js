import axios from "axios";

export const findUsers = async (search) => {
  const { data } = await axios.get(`/api/v1/user/find?search=${search}`);
  return data;
};
