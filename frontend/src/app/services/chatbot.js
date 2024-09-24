const axios = require("axios");

const VOICEFLOW_API_URL =
  "https://general-runtime.voiceflow.com/state/66f158083262418382a89a5b/user/66f158083262418382a89a5b";
export const sendMessageToVoiceflow = async (text) => {
  try {
    const response = await axios.post(
      VOICEFLOW_API_URL,
      {
        // The message you're sending to Voiceflow
        message: text,
      },
      {
        headers: {
          Authorization: "VF.DM.66f15ac2891abf4de38af85e.9RTo2PS3z9No6A6v",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message to Voiceflow:", error);
    throw error;
  }
};
