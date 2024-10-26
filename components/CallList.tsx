'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { CallRecording } from '@stream-io/node-sdk';
import { Call } from '@stream-io/video-client/dist/src/gen/video/sfu/models/models';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Type guard to check if a meeting is of type Call
const isCall = (meeting: Call | CallRecording): meeting is Call => {
  // Use a unique property of Call to determine its type
  return (meeting as Call).id !== undefined; // Adjust this if 'id' is not a valid property
};

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  // Get calls based on the type of list being rendered
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  // Get message to display when there are no calls
  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        // Uncomment and implement fetching logic when ready
        // const callData = await Promise.all(
        //   callRecordings.map((meeting) => meeting.queryRecordings()) ?? [],
        // );
        // const recordings = callData
        //   .filter((call) => call.recordings.length > 0)
        //   .flatMap((call) => call.recordings);
        // setRecordings(recordings);
        
      } catch (error) {
        console.error(error);
        toast({ title: "Try again later" });
      }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings, toast]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className={calls.length > 0 ? "grid grid-cols-1 gap-5 xl:grid-cols-2" : "h-[500px] flex justify-center items-center"}>
      {calls.length > 0 ? (
        calls.map((meeting) => (
          <MeetingCard
            key={isCall(meeting) ? meeting.id : (meeting as CallRecording).id} // Adjust key based on type
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              isCall(meeting)
                ? meeting.state?.custom?.description?.substring(0, 20) || 'Personal meeting'
                : meeting.filename?.substring(0, 20) || 'Personal meeting'
            }
            date={
              isCall(meeting)
                ? meeting.state?.startsAt?.toLocaleString()
                : meeting.start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${isCall(meeting) ? meeting.id : (meeting as CallRecording).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(meeting.url)
                : () => router.push(`/meeting/${isCall(meeting) ? meeting.id : (meeting as CallRecording).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-xl text-gray-500">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
