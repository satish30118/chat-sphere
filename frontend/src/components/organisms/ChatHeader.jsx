"use client";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import Icon from "../atoms/Icon";
import ChatbotIcon from "../atoms/ChatbotIcon"
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useAuth } from "@/app/context/authContext";
import SideDrawer from "./SideDrawer";
import { useRouter } from "next/navigation";
import { getSender } from "@/app/services/chats";
import { googleLogout } from "@react-oauth/google";
import ProfileModal from "../molecules/ProfileModal";
import AIBotModal from "./AIBotModal";

const ChatHeader = ({ fetchChatsAgain, setFetchChatsAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, notification, setNotification, setSelectedChat } = useAuth();
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    googleLogout();
    router.push("/auth");
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#f2f9f8"
        w="100%"
        p="10px 15px"
        borderWidth="2px"
      >
        <Text px={3}  fontSize={{ base: "17px", md: "25px", lg:"30px" }}>
          <b>Chat Sphere</b>
        </Text>
        <div>
        <Menu>
            <Tooltip
              label="AI powered Chatbot"
              hasArrow
              placement="bottom-end"
              
            >
              <AIBotModal>
              <Button
                variant="gost"
              size={{base:8, md:12}}
                marginRight={2}
                bg="#f2f9f8"
              >
               <ChatbotIcon  />
                <Text display={{ base: "none", md: "flex" }} px={2}>
                  Chat Bot
                </Text>
              </Button></AIBotModal>
            </Tooltip>
          </Menu>
          <Menu>
            <Tooltip
              label="Search friends to chat"
              hasArrow
              placement="bottom-end"
              px={7}
            >
              <Button
                variant="ghost"
                onClick={onOpen}
                borderWidth="1px"
                borderRadius="md"
                bg="white"
              >
                <SearchIcon />
                <Text display={{ base: "none", md: "flex" }} px={3}>
                  Search Friend
                </Text>
              </Button>
            </Tooltip>
          </Menu>
         
          <Menu>
            <MenuButton p={1}>
              <div className="re">
                {notification.length > 0 && (
                  <div className="notification-badge">
                    <span className="badge">{notification?.length}</span>
                  </div>
                )}
              </div>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification?.map((notify) => (
                <MenuItem
                  key={notify?._id}
                  onClick={() => {
                    setSelectedChat(notify?.chatId);
                    setNotification(notification?.filter((n) => n !== notify));
                  }}
                >
                  {notify.chatId.isGroupChat
                    ? `New Message in ${notify?.chatId?.chatName}`
                    : `New Message from ${getSender(
                        auth,
                        notify?.chatId?.users
                      )}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              borderWidth="1px"
              borderRadius="md"
              as={Button}
              bg="white"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={auth?.name}
                src={auth?.pic}
              />
            </MenuButton>
            <MenuList p={0}>
              <ProfileModal user={auth}>
                <MenuItem
                  icon={<Icon iconClass="fa-solid fa-right-from-bracket" />}
                >
                  Dashboard
                </MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <SideDrawer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fetchChatsAgain={fetchChatsAgain}
        setFetchChatsAgain={setFetchChatsAgain}
      />
    </>
  );
};

export default ChatHeader;
