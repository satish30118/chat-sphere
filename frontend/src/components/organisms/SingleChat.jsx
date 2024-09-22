"use client";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";

import io from "socket.io-client";
import { useAuth } from "@/app/context/authContext";
import ProfileModal from "../molecules/ProfileModal";
import UpdateGroupChatModal from "../molecules/UpdateGroupChatModal";
import ScrollableChat from "../molecules/ScrollableChat";
import { getSender, getSenderFull } from "@/app/services/chats";
import { findMessages, sendMsg } from "@/app/services/message";
import typingData from "../animations/typing.json";
import svgData from "../animations/home.json";
import Lottie from "react-lottie";
import ThreeDotIcon from "../atoms/ThreeDotIcon";
const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchChatsAgain, setFetchChatsAgain }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typingData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: svgData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, auth, notification, setNotification } =
    useAuth();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const data = await findMessages(selectedChat?._id);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", auth);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const data = await sendMsg(selectedChat?._id, newMessage);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(newMessageRecieved);

      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageRecieved?.chatId?._id
      ) {
        console.log("Message belongs to another chat");
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchChatsAgain(!fetchChatsAgain);
        }
      } else {
        // Add the new message to the current messages
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    });

    // Clean up the listener when the component unmounts or the selected chat changes
    return () => {
      socket.off("message recieved");
    };
  }, [selectedChatCompare, socket, messages]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "17px", md: "25px" }}
            p={2}
            w="100%"
            color="black"
            display="flex"
            alignItems="center"
            justifyContent={{ base: "space-between" }}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            <Avatar
              mx={2}
              size="md"
              cursor="pointer"
              name={
                !selectedChat?.isGroupChat
                  ? getSender(auth, selectedChat?.users)
                  : selectedChat?.chatName
              }
            />
            {!selectedChat?.isGroupChat ? (
              <>
                {getSender(auth, selectedChat?.users)}

                <Menu>
                  <MenuButton>
                    <ThreeDotIcon />
                  </MenuButton>
                  <MenuList p={0} m={0}>
                    <ProfileModal
                      user={getSenderFull(auth, selectedChat?.users)}
                    >
                      <MenuItem
                        _hover={{
                          bg: "lightblue", // Background color on hover
                        }}
                        p={2} // Decrease padding for smaller size
                        m={0} // Remove margins
                        fontSize="sm" // Reduce font size
                      >
                        View Profile
                      </MenuItem>
                    </ProfileModal>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                {selectedChat?.chatName}
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchChatsAgain={fetchChatsAgain}
                  setFetchChatsAgain={setFetchChatsAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="white"
            w="100%"
            h="100%"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="flex flex-col ">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              color="black"
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={70}
                    width={100}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
          bg="#ffffff"
        >
          <Lottie
            options={defaultOptions1}
            height={"90%"}
            width={"100%"}
            style={{ marginBottom: 15, marginLeft: 0 }}
          />
        </Box>
      )}
    </>
  );
};

export default SingleChat;
