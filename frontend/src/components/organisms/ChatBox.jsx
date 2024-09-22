'use client'
import { Box } from "@chakra-ui/layout";
import { useAuth } from "@/app/context/authContext";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchChatsAgain, setFetchChatsAgain }) => {
  const { selectedChat } = useAuth();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      color="white"
      w={{ base: "100%", md: "68%" }}
      borderWidth="1px"
    >
      <SingleChat fetchChatsAgain={fetchChatsAgain} setFetchChatsAgain={setFetchChatsAgain} />
    </Box>
  );
};

export default Chatbox;
