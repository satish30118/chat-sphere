import { useAuth } from "@/app/context/authContext";
import { Avatar, Box } from "@chakra-ui/react";
import {
  BiVideo,
  BiVideoOff,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
const { useParticipant } = require("@videosdk.live/react-sdk");
const { useRef, useMemo, useEffect } = require("react");
const { default: ReactPlayer } = require("react-player");

export function ParticipantView(props) {
  const { auth } = useAuth();
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <Box w='500px' h="350px" borderWidth={2} m={3}>
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
        <Box display="flex" flexDir="row" alignItems="center" size="lg" justifyContent='space-between' mr={3}>
          {webcamOn ? <BiVideo /> : <BiVideoOff />}
          <Box w={5}></Box>
          {micOn ? <BiMicrophone /> : <BiMicrophoneOff />}
        </Box>
      </Box>
      <Box w='496px' h='300px'>
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {props?.calltype == 'video' && webcamOn ? (
          <ReactPlayer
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            height={"100%"}
            width={"100%"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="450px"
            w="99%"
            borderWidth={2}
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
