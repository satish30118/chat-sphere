export const authToken = process.env.VIDEO_ID;
  

export const createMeeting = async ({ token }) => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    const { roomId } = data;
    console.log(data);
    return roomId;
  } catch (error) {
    console.log(error);
  }
};


