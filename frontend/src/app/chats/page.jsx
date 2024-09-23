"use client";

import { Box } from "@chakra-ui/layout";
import { Suspense, useState } from "react";
import { useAuth } from "../context/authContext";
import ChatHeader from "@/components/organisms/ChatHeader";
import MyChats from "@/components/organisms/MyChats";
import Chatbox from "@/components/organisms/ChatBox";

export default function Chatpage() {
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
  const { auth } = useAuth();

  return (
    <div style={{ width: "100%", height:"100%", background:"#f2f9f8" }}>
      {auth && (
        <Suspense>
          <ChatHeader
            fetchChatsAgain={fetchChatsAgain}
            setFetchChatsAgain={setFetchChatsAgain}
          />
        </Suspense>
      )}
      <Box display="flex" justifyContent="space-between" w="100%" h="89.5vh">
        {auth && (
          <Suspense>
            <MyChats fetchChatsAgain={fetchChatsAgain} />
          </Suspense>
        )}
        {auth && (
          <Suspense>
            <Chatbox
              fetchChatsAgain={fetchChatsAgain}
              setFetchChatsAgain={setFetchChatsAgain}
            />
          </Suspense>
        )}
      </Box>
    </div>
  );
}
