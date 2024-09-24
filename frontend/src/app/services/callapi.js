export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlNDkxN2IyNy1hN2ZjLTQ4NTktODRiYi1kYjAyNTJkYmI0MGEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNzA5Njk2OCwiZXhwIjoxNzI3MTgzMzY4fQ.TWB7I8N4gRp9ZhM2i_Dp-CsbOrSQdl-w6tLgPReDhCg";

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  return roomId;
};