"use client"
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import ChatHeader from "@/components/organisms/ChatHeader";
import MyChats from "@/components/organisms/MyChats";
import Chatbox from "@/components/organisms/ChatBox";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const {auth} = useAuth();

  return (
    <div style={{ width: "100%" }}>
      {auth && <ChatHeader />}
      <Box display="flex" justifyContent="space-between" w="100%" h="89.5vh">
        {auth && <MyChats fetchAgain={fetchAgain} />}
        {auth && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;