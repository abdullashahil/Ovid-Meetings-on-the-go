'use client'
import MeetingListType from '@/components/MeetingListType'
import { useUser } from '@clerk/nextjs';

const Home = () => {
  const { user } = useUser();
  const firstName = user?.firstName || "Guest";

  return (
    <section className="flex size-full flex-col gap-5 text-gray">

      <div className="h-[90px] w-full rounded-[20px]">
         
          <h1 className="text-4xl font-extrabold lg:text-6xl">
            Hi, {firstName}
          </h1>
      </div>

      <MeetingListType  />

    </section>
  )
}

export default Home
