import { useAuth } from "@/app/context/authContext";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import UserBadgeItem from "./avatar/UserBadgeItem";
import UserListItem from "./avatar/UserListItem";
import { addUser, removeUser, renameGroup } from "@/app/services/group";
import { findUsers } from "@/app/services/user";

const UpdateGroupChatModal = ({
  fetchMessages,
  fetchChatsAgain,
  setFetchChatsAgain,
  children,
}) => {
  const { auth,  selectedChat, setSelectedChat,  } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async (search) => {
    if (!search) {
      setSearchResult();
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await findUsers(search);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const data = await renameGroup(selectedChat?._id, groupChatName);
      setRenameLoading(false);
      setSelectedChat(data);
      setFetchChatsAgain(!fetchChatsAgain);
      setGroupChatName("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Can't renamed, try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleAddUser = async (user) => {
    try {
      if (selectedChat.users.find((u) => u._id === user._id)) {
        toast({
          title: "User Already in group!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      if (selectedChat.groupAdmin._id !== auth._id) {
        toast({
          title: "Only admins can add someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      setLoading(true);
      const data = await addUser(selectedChat?._id, user?._id);
      setLoading(false);
      toast({
        title: "Added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // console.log(data)
      setSelectedChat(data);
      setGroupChatName("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Can't added, try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

   const handleRemove = async (user) => {
    try {
      if (selectedChat.groupAdmin._id !== auth._id && user._id !== auth._id) {
        toast({
          title: "Only admins can remove someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      const data = await removeUser(selectedChat?._id, user?._id);
      toast({
        title: "Removed successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      user?._id === auth?._id ? setSelectedChat() : setSelectedChat(data);
      setFetchChatsAgain(!fetchChatsAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
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

  return (
    <>
      <span display={{ base: "flex" }} onClick={onOpen}>
        {children}
      </span>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat?.users?.map((u) => (
                <UserBadgeItem
                  key={u?._id}
                  user={u}
                  admin={selectedChat?.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Group Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Friend to group"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <div>
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
              </div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={() => handleRemove(auth)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
