"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import { useAuth } from "@/app/context/authContext";
import LoadingSkeleton from "../molecules/LoadingSkeleton";
import GroupChatModal from "./GroupChatModal";
import { findChats, getSender } from "@/app/services/chats";

const MyChats = ({ fetchChatsAgain }) => {
  const { selectedChat, setSelectedChat, auth ,chats, setChats} = useAuth();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const data = await findChats();
      setChats(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchChatsAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={2}
      bg="#f2f9f8"
      w={{ base: "100%", md: "32%" }}
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Chats
        <GroupChatModal callback={fetchChats}>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#f2f9f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#dee6f2" : "#f2f9f8"}
                color="black"
                px={8}
                py={4}
                borderRadius="md"
                key={chat?._id}
                display="flex"
                alignItems="center"
                justifyContent="space-between" // Add this line
                _hover={{ bg: "#dee6f2" }}
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    mr={2}
                    size="md"
                    cursor="pointer"
                    name={
                      !chat?.isGroupChat
                        ? getSender(auth, chat?.users)
                        : chat?.chatName  
                    }
                    
                  />
                  <Box>
                    <Text>
                      <b>
                        {!chat?.isGroupChat
                          ? getSender(auth, chat?.users)
                          : chat?.chatName}
                      </b>
                    </Text>
                    {chat?.latestMessage && (
                      <Text fontSize="sm">
                        {chat?.isGroupChat && chat?.latestMessage?.sender?.name}
                        {" ~ "}
                        <span className="text-gray-500">
                          {chat?.latestMessage?.content?.length > 10
                            ? chat?.latestMessage?.content.substring(0, 11) +
                              " ..."
                            : chat?.latestMessage?.content}
                        </span>
                      </Text>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Text fontSize={"xs"}>
                    {new Date(chat?.updatedAt)?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <LoadingSkeleton />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
