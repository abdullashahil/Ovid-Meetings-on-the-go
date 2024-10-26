import { useUser } from "@clerk/clerk-react";
import { Call } from "@stream-io/video-client/dist/src/gen/video/sfu/models/models";
import { useStreamVideoClient } from "@stream-io/video-react-bindings";
import { useEffect, useState } from "react"

export const useGetCalls = () => {
  const [calls, setCalls]= useState<Call[]>([]);
  const [isLoading, setIsLoading]= useState(false);

  const client = useStreamVideoClient(); 
  const {user} = useUser();

  useEffect(()=> {
    const loadcalls = async() => {
      if(!client || !user?.id) return;
      
      setIsLoading(true);

      try {
        const {calls}= await client.queryCalls({
          sort: [{field: 'starts_at', direction: -1}],
          filter_conditions: { 
            starts_at: {$exists: true},
            $or : [
              {created_by_user_id: user.id},
              {members: {$in: [user.id]}},
            ]
          }
        });

        // @ts-expect-error: TypeScript might not recognize the Call type
        setCalls(calls);
      } catch (error) {
        console.log(error)
      } finally{
        setIsLoading(false);
      }
    }

    loadcalls();

  }, [client, user?.id])

  const now = new Date();
  
const endedCalls = calls.filter(({
  // @ts-expect-error: TypeScript might not recognize the state on the Call type

  state: {startsAt, endedAt}
} : Call) => {
  return (startsAt && new Date(startsAt) < now || !!endedAt)
});

const upcomingCalls = calls.filter(({
// @ts-expect-error: TypeScript might not recognize the state on the Call type

  state: { startsAt }
} : Call) => {
  return (startsAt && new Date(startsAt) > now)
});

  return {endedCalls, upcomingCalls, callRecordings: calls, isLoading};
}