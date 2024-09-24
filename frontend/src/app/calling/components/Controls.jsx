import { useAuth } from "@/app/context/authContext";
import { getSender } from "@/app/services/chats";
import { PhoneIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, IconButton } from "@chakra-ui/react";
import {
  BiVideo,
  BiVideoOff,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
const { useMeeting } = require("@videosdk.live/react-sdk");

export function Controls(props) {
  const { auth} = useAuth();
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);
  const { leave, toggleMic, toggleWebcam } = useMeeting();
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
          size="md"
          cursor="pointer"
          name={auth?.name}
          pic={auth?.pic}
        />
        <b>{auth?.name}</b>
      </Box>
      <Box display="flex" flexDir="row" alignItems="center">
        <Button
          colorScheme="red"
          variant="solid"
          mx={5}
          onClick={() => leave()}
        >
          End Call
        </Button>
        {webcamOn ? (
          <IconButton
            mx={5}
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<BiVideo />}
            onClick={() => toggleWebcam()}
          />
        ) : (
          <IconButton
            mx={5}
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<BiVideoOff />}
            onClick={() => toggleWebcam()}
          />
        )}{" "}
        |
        {micOn ? (
          <IconButton
            mx={5}
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<BiMicrophone />}
            onClick={() => toggleMic()}
          />
        ) : (
          <IconButton
            mx={5}
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<BiMicrophoneOff />}
            onClick={() => toggleMic()}
          />
        )}
      </Box>
    </Box>
  );
}
