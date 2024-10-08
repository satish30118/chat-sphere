"use client";
import React, { useState, useEffect } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { MeetingView } from "../../components/MeetingView";
import { authToken, createMeeting } from "../../../services/callapi";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/context/authContext";

function Room() {
  const {auth} = useAuth()
  const username = auth?.name;
  const { type, roomid } = useParams();
  const [meetingId, setMeetingId] = useState(null);
  const onMeetingLeave = () => {
    setMeetingId(null);
  };
  useEffect(()=>{setMeetingId(roomid)},[])

  return (
    authToken &&
    meetingId && (
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name : {username}
        }}
        token={authToken}
      >
        <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} callType={type} />
      </MeetingProvider>
    )
  );
}

export default Room;
