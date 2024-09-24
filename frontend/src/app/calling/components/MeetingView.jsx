import { Box, Button } from "@chakra-ui/react";

const { useMeeting } = require("@videosdk.live/react-sdk");
const { useState, useEffect } = require("react");
const { ParticipantView } = require("./ParticipantView");
const { Controls } = require("./Controls");

export function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };
  useEffect(() => {
    joinMeeting();
  }, []);
  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        <div>
          <Controls callType = {props.callType}/>
          <Box display="flex" flexWrap='wrap' w='100%' justifyContent="center" alignItems="center">
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                callType={props.callType}
                key={participantId}
              />
            ))}
          </Box>
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>call connecting...</p>
      ) : (
        <Button colorScheme="blue" variant="outline" onClick={joinMeeting}>
          Call
        </Button>
      )}
    </div>
  );
}
