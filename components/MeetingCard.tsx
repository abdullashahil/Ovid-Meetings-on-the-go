"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    let date;
  
    // Check if the dateString matches the "DD/MM/YYYY, HH:mm:ss" format
    if (dateString.includes("/")) {

      const parts = dateString.split(", ");
      const dateParts = parts[0].split("/");
      const timeParts = parts[1].split(":");
  
      const isoDateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
      date = new Date(isoDateString);
    } else {
      date = new Date(dateString);
    }
  
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  

  return (
    <section
      className={`flex ${
        isPreviousMeeting ? "min-h-[200px]" : "min-h-[250px]"
      } w-full flex-col justify-between rounded-[14px] bg-color-2 px-5 py-8 xl:max-w-[568px] border text-white`}
    >
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">
             {formatDate(date)}
            </p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-left relative", {})}>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-color-1 px-6 text-center">
              {buttonIcon1 && (
                <Image
                  src={buttonIcon1}
                  alt="feature"
                  width={20}
                  height={20}
                  className="mr-2"
                />
              )}
               {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6  bg-gray-800"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
