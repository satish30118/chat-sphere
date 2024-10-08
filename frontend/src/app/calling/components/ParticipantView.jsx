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
    <Box w={{base: "95%", md: "700px"} }  h='100%' borderWidth={2} borderColor={'black'} m={3}>
  
      <Box w={{base:"95%", md:"697px"}} >
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
            width={"100%"}
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
              name={props.participantId}
            />
          </Box>
        )}
      </Box>  
        <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        w={{base: "95%", md: "697px"} }
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
            name={props.participantId}
            pic={auth?.pic}
          />
          <b>{props.participantId}</b>
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
    </Box>
  );
}
