import { Box, Icon } from "@chakra-ui/react";
import { FaCommentDots } from "react-icons/fa";

const ChatbotIcon = () => {
  return (
    <Box 
      as="button" 
      borderRadius="full" 
      bg="teal.500" 
      color="white" 
      p={4} 
      boxShadow="md"
      _hover={{ bg: "teal.400" }}
      w="20px" // Adjust width here
      h="20px" // Adjust height here
    >
      <Icon as={FaCommentDots} w={8} h={8} /> // Adjust icon size here
    </Box>
  );
};

export default ChatbotIcon;
