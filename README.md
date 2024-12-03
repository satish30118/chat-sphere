---
# Real Time Chat Application (Web Application)

## Introduction

Chat Sphere is real-time chat application, developed using NextJs, NodeJs and socket.io

## Features

- Secure user authentication
- One-on-one and group chat
- Real-time messaging
- Video and audio calls
- AI-powered chatbot integration


## Installation
- Download or Clone the repository. (Keep all files in same folder as here.)
- Clone by command --> `git clone https://github.com/satish30118/chat-sphere.git`

### Start Frontend

1. Open the terminal of your code editor.
2. Navigate to the frontend directory by running `cd frontend`.
3. Install all dependencies by running `npm i`.
4. Create a **.env.local** file with the following configurations:
   - Backend URL
   - GOOGLE_CLIENT_ID
   - Videosdk.live authToken
4. Start the frontend by running `npm run dev`.

### Start Backend

1. Open another terminal of your code editor.
2. Navigate to the backend directory by running `cd backend`.
3. Install all dependencies by running `npm i`.
4. Create a **.env** file with the following configurations:
   - MongoDB Atlas or local database link
   - PORT number
   - JWT_TOKEN_KEY
   - OpenAI Secret key
5. Start the backend by running `node server.js` or `npm start`.


## Technology Stack

### Frontend

- NextJS
- Dependencies:
  - @chakra-ui/react
  - @videosdk.live/react-sdk
  - @react-oauth/google
  - Axios: for API integration
  - react-lottie
  - react-player
  - socket.io-client
  - jwt-decode

### Backend

- Node.js
- Express.js
- Mongoose
- Dependencies:
  - JWToken: for user verification
  - Bcrypt: for password hashing
  - dotenv : to secure Port, Secret_Key and data base connection
  - socket.io
  - openai


### Database

- MongoDB

## Deployment
deploy Link: [(https://chat-sphere-theta.vercel.app/)]

## Documentation

Documentation Link: [(https://docs.google.com/document/d/16TOESBsWthpVqDGz7-Mnw4Ydm60v_FOQ/edit?usp=sharing&ouid=113073976967163913013&rtpof=true&sd=true)]


---
