import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

const Homeheader = () => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="90%"
      m="20px auto"
      borderRadius="lg"
      borderWidth="2px"
    >
      <Center h="50px" color="blue">
        Welcome to Chat-Sphere
      </Center>
    </Box>
  );
};

export default Homeheader;
