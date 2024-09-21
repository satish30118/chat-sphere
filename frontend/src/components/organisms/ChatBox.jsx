import { Box } from "@chakra-ui/layout";
import { useAuth } from "@/app/context/authContext";
import SingleChat from "../molecules/SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const [selectedChat] = useAuth();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
