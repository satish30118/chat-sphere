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
import { addUser, removeUser, renameGroup } from "@/app/api/group";
import { findUsers } from "@/app/api/user";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = useAuth();

  const handleSearch = async (search) => {
    if (!search) {
      setSearchResult();
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = await findUsers(search);
    setSearchResult(data);
    setLoading(false);

    if (!data) {
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
    setRenameLoading(true);
    const data = await renameGroup(selectedChat?._id, groupChatName);
    setRenameLoading(false);
    if (!data) {
      toast({
        title: "Error Occured!",
        description: "Can't renamed, try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    setGroupChatName("");
  };

  const handleAddUser = async (user) => {
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
    const data = addUser(selectedChat?._id, user?._id);
    console.log(data)
    setLoading(false);
    if (!data) {
      toast({
        title: "Error Occured!",
        description: "Can't added, try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    toast({
      title: "Added successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setSelectedChat(data);
    // setFetchAgain(!fetchAgain);
    setGroupChatName("");
  };

  const handleRemove = async (user) => {
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
    if (!data) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Can't remove from group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    toast({
      title: "Removed successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    user?._id === auth?._id ? setSelectedChat() : setSelectedChat(data);
    setFetchAgain(!fetchAgain);
    fetchMessages();
    setLoading(false);
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />
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
          <ModalFooter>
            <Button onClick={() => handleRemove(auth)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
