import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPersonalRoom = searchParams.get('personal');
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if(callingState != CallingState.JOINED) return <Loader/>



    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition='right' />
            default:
                return <SpeakerLayout participantsBarPosition='left' />
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="relative flex size-full items-center justify-center">
                <div className=" flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                        'show-block': showParticipants,
                    })}
                >
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">

                <CallControls onLeave={() => router.push('/')} />

                <DropdownMenu >
                    <div className='flex items-center'>
                    <DropdownMenuTrigger className='cursor-pointer rounded-2xl  bg-gray-800 hover:bg-gray-700 px-4 py-2'>
                        <LayoutList size={20} className='bg-gray-800'/>
                    </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-gray-700 bg-gray-800 text-white'>
                        {['grid' , 'speaker-left' , 'speaker-right']
                        .map((item, index)=> (
                            <div key={index}>
                                <DropdownMenuItem className='cursor-pointer ' onClick={()=> { setLayout(item) as CallLayoutType }}>
                                    {item}
                                </DropdownMenuItem>
                            </div>
                        ))}
                        <DropdownMenuSeparator className='border-gray-700'/>

                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />

                <button onClick={() => { setShowParticipants((prev)=> !prev)}}>
                    <div className='cursor-pointer rounded-2xl bg-gray-800 hover:bg-gray-700 px-4 py-2'>
                        <Users size={20} className='text-gray-400' />
                    </div>
                </button>

{!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}

export default MeetingRoom 