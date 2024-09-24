import axios from "axios";
export const callChatBot = async (question) => {
  const { data } = await axios.get("/api/v1/message/openai-chat", {question});
  return data;
};