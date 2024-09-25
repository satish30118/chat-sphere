export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlNDkxN2IyNy1hN2ZjLTQ4NTktODRiYi1kYjAyNTJkYmI0MGEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNzI2NDQ3MCwiZXhwIjoxNzM1MDQwNDcwfQ.HVipmV_aVGjC5o29FJ6hPpDdUYZpCvaVwlu5Nk1LQmA";
  

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


