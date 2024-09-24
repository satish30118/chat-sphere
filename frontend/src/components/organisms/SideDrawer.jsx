"use client";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import LoadingSkeleton from "../molecules/LoadingSkeleton";
import { useAuth } from "@/app/context/authContext";
import { useToast } from "@chakra-ui/react";
import { findUsers } from "@/app/services/user";
import UserListItem from "../molecules/avatar/UserListItem";
import { fetchChat } from "@/app/services/chats";
import axios from "axios";

function SideDrawer({
  isOpen,
  onOpen,
  onClose,
  fetchChatsAgain,
  setFetchChatsAgain,
}) {
  const { auth, setSelectedChat, chats, setChats } = useAuth();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const toast = useToast();

  const handleSearch = async (search) => {
    if (!search) {
      setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const data = await findUsers(search);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    // console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/v1/chat/one-to-one`,
        { userId },
        config
      );
// console.log(data)
      if (!chats?.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setFetchChatsAgain(!fetchChatsAgain);
      setLoadingChat(false);
      setSearchResult([]);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <div style={{ background: "#f2f9f8" }}>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Friends</DrawerHeader>
            <DrawerBody>
              <Box display="flex" pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Box>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user?._id}
                    user={user}
                    handleFunction={() => accessChat(user?._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" my={5} display="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default SideDrawer;
