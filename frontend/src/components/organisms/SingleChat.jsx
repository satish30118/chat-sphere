"use client";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowBackIcon, PhoneIcon, ViewIcon } from "@chakra-ui/icons";
import { MdVideocam, MdCall } from "react-icons/md";
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
import { removeUser } from "@/app/services/group";
import { useRouter } from "next/navigation";
import { authToken, createMeeting } from "@/app/services/callapi";
const ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
var socket, selectedChatCompare;

const SingleChat = ({ fetchChatsAgain, setFetchChatsAgain }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [openCallTab, setOpenCallTab] = useState(false);
  const [callingRoomId, setCallingRoomId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    socket.on("call recieved", (roomid) => {
      setOpenCallTab(true);
      setCallingRoomId(roomid);
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

  const handleLeave = async () => {
    try {
      const data = await removeUser(selectedChat?._id, auth?._id);
      toast({
        title: "Leave successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setSelectedChat();
      setFetchChatsAgain(!fetchChatsAgain);
      fetchMessages();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Can't remove from group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const router = useRouter();
  const handleVideoCall = async () => {
    const roomid = await createMeeting({ token: authToken });
    router.push(`calling/video/${roomid}`);
    socket.emit("calling", { roomid, selectedChat, callerId: auth?._id });
  };
  const handleAudioCall = async () => {
    const roomid = await createMeeting({ token: authToken });
    router.push(`calling/audio/${roomid}`);
    socket.emit("calling", { roomid, selectedChat, callerId: auth?._id });
  };
   const handleReceiveCall = async () => {
    router.push(`calling/video/${callingRoomId}`);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: "17px", md: "25px" }}
            p={2}
            pl={{base:1, md:2}}
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
            <Box display="flex" alignItems="center" justifyContent="center">
              <Avatar
                mx={2}
                size={{base:"sm", md:"md"}}
                cursor="pointer"
                name={
                  !selectedChat?.isGroupChat
                    ? getSender(auth, selectedChat?.users)
                    : selectedChat?.chatName
                }
              />
              <Text fontSize={{base:"sm", md:"md", lg:"lg"}}>
                {!selectedChat?.isGroupChat
                  ? getSender(auth, selectedChat?.users)
                  : selectedChat?.chatName}
              </Text>
            </Box>
            {!selectedChat?.isGroupChat ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <IconButton
                  mr={{base:2, md:6}}
                  fontSize={22}
                  icon={<MdVideocam />}
                  onClick={handleVideoCall}
                />
                <IconButton
                 mr={{base:2, md:6}}
                  icon={<PhoneIcon />}
                  onClick={handleAudioCall}
                />
                
                <Menu>
                  <MenuButton mr={{base:2, md:4}}>
                    <ThreeDotIcon />
                  </MenuButton>
                  <MenuList p={0} m={0}>
                    <ProfileModal
                      user={getSenderFull(auth, selectedChat?.users)}
                    >
                      <MenuItem
                        bg="white"
                        _hover={{
                          bg: "#f2f9f8",
                        }}
                        p={3}
                        m={0}
                        fontSize="md"
                      >
                        View Profile
                      </MenuItem>
                    </ProfileModal>
                  </MenuList>
                </Menu>
              </Box>
            ) : (
              <>
                <Box display="flex" alignItems="center" justifyContent="center">
                <IconButton
                  mr={{base:2, md:6}}
                  fontSize={22}
                  icon={<MdVideocam />}
                  onClick={handleVideoCall}
                />
                <IconButton
                 mr={{base:2, md:6}}
                  icon={<PhoneIcon />}
                  onClick={handleAudioCall}
                />
                 

                  <Menu>
                    <MenuButton mr={{base:2, md:4}}>
                      <ThreeDotIcon />
                    </MenuButton>
                    <MenuList p={0} m={0}>
                      <UpdateGroupChatModal
                        fetchMessages={fetchMessages}
                        fetchChatsAgain={fetchChatsAgain}
                        setFetchChatsAgain={setFetchChatsAgain}
                      >
                        <MenuItem
                          bg="white"
                          _hover={{
                            bg: "#f2f9f8",
                          }}
                          p={3}
                          m={0}
                          fontSize="md"
                        >
                          Update group
                        </MenuItem>
                      </UpdateGroupChatModal>

                      <MenuItem
                        bg="white"
                        _hover={{
                          bg: "#f2f9f8",
                        }}
                        p={3}
                        m={0}
                        fontSize="md"
                        onClick={handleLeave}
                      >
                        Leave group
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </>
            )}
          </Box>
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
          flexDir={"row"}
          alignItems="center"
          justifyContent="center"
          w="100%"
          pt={6}
          h="100%"
          bg="#ffffff"
        >
          <Lottie options={defaultOptions1} />
        </Box>
      )}

      {/* Calling Modal */}
      <Modal size="lg" onClose={onClose} isOpen={openCallTab} isCentered>
        <ModalOverlay />
        <ModalContent bg="#f2f9f8">
          <ModalHeader
            fontSize="25px"
            display="flex"
            justifyContent="center"
            borderWidth="1px"
          >
            Call Receiving....
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            py={6}
          >
            <Button variant="solid" colorScheme={"green"} onClick={handleReceiveCall}>
              Pick Up
            </Button>
            <Button
              variant="solid"
              colorScheme={"red"}
              onClick={() => setOpenCallTab(false)}
            >
              Reject
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingleChat;
