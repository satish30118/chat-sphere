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
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal size="lg"   onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#f2f9f8" >
          <ModalHeader
            fontSize="25px"
            display="flex"
            justifyContent="center"
            borderWidth="1px"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center" 
           py={6}
          >
            <Avatar
              mb={3}
              h={200}
              w={200}
              cursor="pointer"
              src={user?.pic}
              alt={user?.name}
            />
            <Text
              fontSize={{ base: "18px", md: "23px" }}
            >
              Email: {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
