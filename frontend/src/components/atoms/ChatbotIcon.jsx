import { Box, Icon } from "@chakra-ui/react";
import { FaCommentDots } from "react-icons/fa";

const ChatbotIcon = () => {
  return (
    <Box>
      <Icon as={FaCommentDots} w={6} h={6} />
    </Box>
  );
};

export default ChatbotIcon;
