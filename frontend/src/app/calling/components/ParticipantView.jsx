import { useAuth } from "@/app/context/authContext";
import { Avatar, Box } from "@chakra-ui/react";
import {
  BiVideo,
  BiVideoOff,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
import { useParticipant } from "@videosdk.live/react-sdk";
import { useRef, useMemo, useEffect } from "react";
import ReactPlayer from "react-player";

export function ParticipantView(props) {
  const { auth } = useAuth();
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal } = useParticipant(
    props.participantId
  );

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    // Request video permissions if the call type is 'video'
    const requestVideoPermissions = async () => {
      if (props.callType === "video") {
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
        } catch (error) {
          console.error("Error requesting video permissions:", error);
        }
      }
    };

    requestVideoPermissions();

    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) => console.error("Audio play failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn, props.callType]); // Include callType in the dependency array

  return (
    <Box w="500px" h="350px" borderWidth={2} m={3}>
      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        mx="auto"
        p={2}
        px={5}
        bg="#f2f9f8"
      >
        <Box display="flex" flexDir="row" alignItems="center">
          <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={auth?.name}
            pic={auth?.pic}
          />
          <b>{auth?.name}</b>
        </Box>
        <Box
          display="flex"
          flexDir="row"
          alignItems="center"
          size="lg"
          justifyContent="space-between"
          mr={3}
        >
          {webcamOn ? <BiVideo /> : <BiVideoOff />}
          <Box w={5}></Box>
          {micOn ? <BiMicrophone /> : <BiMicrophoneOff />}
        </Box>
      </Box>
      <Box w="500px" h="300px">
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {props.callType == "video" && webcamOn ? (
          <ReactPlayer
            playsinline // crucial prop for mobile
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            height={"100%"}
            width={"500px"}
            onError={(err) => {
              console.error(err, "participant video error");
            }}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="300px"
            w="100%"
          >
            <Avatar
              mr={2}
              size="lg"
              cursor="pointer"
              name={auth?.name}
              pic={auth?.pic}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
