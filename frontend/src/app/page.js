"use client";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./context/authContext";

export default function Home() {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth?.token) {
      router.push("/chats");
    } else {
      router.push("/auth");
    }
  }, []);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      h="100vh"
      w="100vw"
      bg="#f2f9f8"
    >
      <Text fontSize="3xl" pb={3}>
        Verifying user, please wait..
      </Text>
      <Box>
        <Spinner size="medium" w={8} h={8} alignSelf="center" margin="auto" />
      </Box>
    </Box>
  );
}
