"use client"
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import ChatHeader from "@/components/organisms/ChatHeader";
import MyChats from "@/components/organisms/MyChats";
import Chatbox from "@/components/organisms/ChatBox";


const Chatpage = () => {
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
  const {auth} = useAuth();

  return (
    <div style={{ width: "100%" }}>
      {auth && <ChatHeader fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain}/>}
      <Box display="flex" justifyContent="space-between" w="100%" h="89.5vh">
        {auth && <MyChats fetchChatsAgain={fetchChatsAgain} />}
        {auth && (
          <Chatbox fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;