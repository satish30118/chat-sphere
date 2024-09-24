import { callChatBot } from "@/app/services/chatbot";
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
  Text,
  Avatar,
  Box,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import ScrollableChat from "../molecules/ScrollableChat";


const AIBotModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState()


  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const data = await callChatBot(newMessage);
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

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isRight>
        <ModalOverlay />
        <ModalContent bg="#f2f9f8">
          <ModalHeader
            fontSize="25px"
            display="flex"
            justifyContent="center"
            borderWidth="1px"
          >
            AI Bot
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            py={6}
          >
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
              <div className="flex flex-col min-h-20">
                <ScrollableChat messages={messages} />
              </div>

              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                color="black"
                mt={3}
              >
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={sendMessage}
                />
              </FormControl>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AIBotModal;
