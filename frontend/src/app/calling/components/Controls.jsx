import { useAuth } from "@/app/context/authContext";
import { getSender } from "@/app/services/chats";
import { PhoneIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiVideo,
  BiVideoOff,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
const { useMeeting } = require("@videosdk.live/react-sdk");

export function Controls(props) {
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  const { auth } = useAuth();
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const router = useRouter()

  useEffect(() => {
    if(props.callType=='audio') toggleWebcam()
  }, []);
  return (
    <Box
      display="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      mx="auto"
      p={5}
      bg="#f2f9f8"
    >
      <Box display="flex" flexDir="row" alignItems="center">
        <Avatar
          mr={2}
          size={{base:"sm", md:"md"}}
          cursor="pointer"
          name={auth?.name}
          pic={auth?.pic}
        />
        <Text fontSize={{base:"12px", md:"20px"}}>{auth?.name}</Text>
      </Box>
      <Box display="flex" flexDir="row" alignItems="center">
        <Button
          colorScheme="red"
          variant="solid"
          mx={{base:2, md:5}}
          fontSize={{base:"12px", md:"16px"}}
          onClick={() => {leave(); router.push('/chats')}}
        >
          End Call
        </Button>
        {props.callType == "video" ? (
          video ? (
            <IconButton
            mx={{base:2, md:5}}
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              icon={<BiVideo />}
              onClick={() => {
                toggleWebcam();
                setVideo(!video);
              }}
            />
          ) : (
            <IconButton
              mx={5}
              colorScheme="teal"
              aria-label="Call Segun"
              size="md"
              icon={<BiVideoOff />}
              onClick={() => {
                toggleWebcam();
                setVideo(!video);
              }}
            />
          )
        ) : (
          <></>
        )}
        {mic ? (
          <IconButton
            mx={5}
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<BiMicrophone />}
            onClick={() => {
              toggleMic();
              setMic(!mic);
            }}
          />
        ) : (
          <IconButton
            mx={5}
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<BiMicrophoneOff />}
            onClick={() => {
              toggleMic();
              setMic(!mic);
            }}
          />
        )}
      </Box>
    </Box>
  );
}
