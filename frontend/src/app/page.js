"use client";
import { Box, Spinner, Text,} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./context/authContext";
import axios from "axios";

export default function Home() {
  const { auth } = useAuth();
  const router = useRouter();
  const userAuthentication = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      };
      const { data } = await axios.get(`/api/v1/user/authentication`, config);
      // console.log(data);
      if (!data?.status == 401) {
        router.push("/chats");
      } else {
        router.push("/auth");
      }
    } catch (error) {
      console.log(error);
      router.push("/auth");
    }
  };
  useEffect(() => {
    userAuthentication();
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
