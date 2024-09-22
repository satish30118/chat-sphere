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
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "@/app/context/authContext";
import SideDrawer from "./SideDrawer";
import { useRouter } from "next/navigation";
import { getSender } from "@/app/services/chats";

const ChatHeader = ({ fetchChatsAgain, setFetchChatsAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, notification, setNotification, setSelectedChat } = useAuth();
  const router = useRouter();
  const logoutHandler = () => {
    const logout = localStorage.removeItem("userInfo");
    router.push("/auth");
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="10px 20px"
        borderWidth="3px"
      >
        <Tooltip label="Search friends to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            borderWidth="1px"
            borderRadius="md"
          >
            <Icon iconClass="fa-solid fa-magnifying-glass" />
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search Friend
            </Text>
          </Button>
        </Tooltip>
        <div>
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
            <MenuList>
              <MenuItem
                icon={<Icon iconClass="fa-solid fa-right-from-bracket" />}
              >
                Dashboard
              </MenuItem>
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
